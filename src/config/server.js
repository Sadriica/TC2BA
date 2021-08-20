const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');

const app = express(); //Inicializar server

//Configurar
//Puertos:
app.set('port', process.env.PORT || 3000);
//Gestor de plantillas
app.set('view engine', 'ejs');
//Rutas de las vistas
app.set('views', path.join(__dirname, '../app/views'));

//Middlewares (manejo de informacion)
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Configurar dotenv (variables del entorno)
dotenv.config({path: path.join(__dirname, '../env/.env')});

//Configurar la ruta donde esta alojado el css.
app.use('/resources', express.static(path.join(__dirname, '../public')));

//Configurar el manejo de sesiones
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

module.exports = app;