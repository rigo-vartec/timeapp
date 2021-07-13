const express = require('express');
const router = express.Router();

const passport = require('passport');
const db = require('../database',{multipleStatements: true});

const { isLoggenIn,isNotLoggenIn } = require('../lib/vistas');

router.get('/login', isNotLoggenIn, (req, res) =>{
    res.render('formularios/login');
});


router.post('/login', async(req, res) =>{
    let username = req.body.username;
    let maquina = req.body.num_maquina;
    const row = await db.query('SELECT * FROM users Where username = ?', [username]);
    if(row.length > 0){
        const user = row[0];
        passport.authenticate('local.login', {
    successRedirect: '/inicio/logged/'+ user.page,
    failureRedirect: '/login',
    failureFlash: true
    })(req, res);
    }else {
        req.flash('info', 'Por favor introduce un numero de operador valido');
        res.redirect('/login');
    }
});

router.post('/login/maquinas', async(req, res) =>{
    let username = req.body.username;
    let maquina = req.body.num_maquina;
    const row = await db.query('SELECT * FROM users Where username = ?', [username]);
    if(row.length > 0){
        const user = row[0];
        passport.authenticate('local.login', {
    successRedirect: '/inicio/logged/'+ user.rol,
    failureRedirect: '/inicio/maquina/'+maquina,
    failureFlash: true
    })(req, res);
    }else {
        req.flash('info', 'Por favor introduce un numero de operador valido');
        res.redirect('/inicio/maquina/'+maquina);
    }
});

router.get('/registro', isNotLoggenIn, (req, res) =>{
    res.render('formularios/registro')
});

/*router.post('/registro', (req, res) =>{
   passport.authenticate('local.registro', {
    successRedirect: '/perfil',
    failureRedirect: '/resgistro',
    failureFlash: true
});
});*/


router.post('/registro', async(req, res) =>{
    let username = req.body.username;
    const row = await db.query('SELECT * FROM users Where username = ?', [username]);
    if(row.length > 0){
        req.flash('info', 'El usuario que deseas registrar ya existe');
        res.redirect('/login');
    }else {
        passport.authenticate('local.registro', {
            successRedirect: '/inicio/',
            failureRedirect: '/registro',
            failureFlash: true
            })(req, res);
    }
});


router.get('/logout', (req, res) =>{
    req.logOut();
    req.flash('info' ,'Sesión Cerrada');
    res.redirect('/login');
});

module.exports = router;
