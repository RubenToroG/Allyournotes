const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars'); //motor de plantillas
const methodOverride = require('method-override');//formularios pueden enviar otros tipos de metodos
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport')

//Initializacions----------------------------------------------------------------------------------
const app = express();
require('./database');
require('./config/passport');

//settings-----------------------------------------------------------------------------------------
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));//establece las vistas en la carpeta views
            //preparar las vistas
app.engine('.hbs', exphbs({     //configura modulo handlebars
    defaultLayout: 'main',      //plantilla donde se pone el diseño principal main.hbs dentro de views
    layoutsDir: path.join(app.get('views'), 'layouts'), //obtine la dirección de la carpeta views y concatena con layouts
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' //indica que extensión van a tener los archivos

}));
app.set('view engine', '.hbs'); //configura motor de plantillas

//Middlewares--------------------------------------------------------------------------------------
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',  //palabra secreta
    resave: true,
    saveUninitialized: true    
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables---------------------------------------------------------------------------------
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;     //si el usuario no esta autenticado, no existe, su valor será nulo 
    
    next();
});

//Routes------------------------------------------------------------------------------------------
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files--------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning------------------------------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});