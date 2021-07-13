const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../database');

const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordfield: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const rows = await db.query('SELECT * FROM users Where username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if(validPassword){
            done(null, user, req.flash('info' ,'Operador ' + user.username));
        }else{
            done(null, false, req.flash('info' ,'contraseña incorrecta'));
        }
    }else{
        return done(null, false, req.flash('info' ,'El usuario no existe'));
    }
}));

passport.use('local.registro', new LocalStrategy({
    usernameField: 'username',
    passwordfield: 'password',
    passReqToCallback: true
}, async(req,username,password,done) => {
    const {fullname,rol} = req.body;
    const newuser ={
        username,
        password,
        fullname,
        rol
    };
    newuser.password = await helpers.encryptPassword(password);
    const resultado = await db.query('INSERT INTO users SET ?', [newuser]);
    newuser.id = resultado.insertId;
    return done(null, newuser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
    const rows = await db.query('SELECT * FROM users Where id = ?', [id]);
    done(null, rows[0]);
});