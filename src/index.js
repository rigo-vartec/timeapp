const http = require('http');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const realtime = require('./socket');
const { database } = require('./keys');

//iniciar
const app = express(); 
require('./lib/passport');

const server = http.Server(app);


//configuraciones servidor
//app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//funciones
app.use(session({
secret: 'mysessionMySQL',
resave: false,
saveUninitialized: false,
store: new MySQLStore( database )
}));

sessionMiddleware = session({
  secret: 'my_s3cr3t_s3ss1on',
  resave: true,
  saveUninitialized: true
});

realtime(server,sessionMiddleware);
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());            
app.use(passport.initialize()); 
app.use(passport.session());  
//variables globales  
app.use((req, res, next) => {
   app.locals.info = req.flash('info');
   app.locals.user = req.user;
    next();
});

//rutas
app.use(require('./routes/index'));
app.use(require('./routes/auntenticaciones'));

//archivos publicos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/img', express.static(__dirname + '/img'));
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));

//iniciar servidor
server.listen(4000, () => {
  console.log("your http server listening on the port 4000" + "/");
});





  








