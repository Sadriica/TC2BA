

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

//verificador de que la conexion sea adecuada 
connection.connect((err) => {
    if(err){
        console.log("Error de conexion con BD:" + err);
        return;
    }
    console.log("conectado exitosamente con la BD:")
})

module.exports = connection;