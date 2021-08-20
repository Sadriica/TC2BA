//Rutas
const bcryptjs = require('bcryptjs');
const connection = require('../../config/db');


module.exports = app => {
   app.get('/', (req,res) => {
       if (req.session.loggedin) {

       res.render ('../views/index.ejs', {
           login : true,
           name : req.session.name
            });
        } else {
           res.render('../views/index.ejs', {
               login: false,
               name: 'Inicie sesión'
           });
       }
    })

    app.get('/index', (req,res) => {
        res.render('../views/index.ejs');
    })

    app.get('/login', (req,res) => {
        res.render('../views/login.ejs');
    })

    app.get('/register', (req,res) => {
        res.render('../views/register.ejs');
    })

    app.get('/canasta', (req,res) => {
        res.render('../views/canasta.ejs');
    })

    app.get('/administrador', (req,res) => {
       connection.query('SELECT * FROM contacto' , (err, results) => {  
           if(err){
               console.log(err)
           } else{
               res.send(results)
           }
       })
    })

    app.get('/venta', (req,res) => {
        res.render('../views/venta.ejs');
    })

    /* app.get('/perfil', (req,res) => {
        let correo = global.correo;
        console.log('Este es el correo: ' + correo);
        connection.query ('SELECT * FROM users WHERE correo = ? ', [correo], (error, resultados) => {
            if (error) {
                console.log (error)
            } else {
                res.render ('../views/perfil.ejs', {
                    //login correcto sw2
                    alert : true,
                    alertTitle : 'Conexión exitosa',
                    alertMessage : 'Login Correcto',
                    alertIcon : 'success',
                    showConfirmButton : false,
                    timer : 1500,
                    ruta : '',
                    perfil : resultados[0]
                });
                console.log(resultados);
            }
        });
        res.render('../views/perfil.ejs');
    })*/

    app.get('/logout', (req,res) => {
        req.session.destroy(() => {
            res.redirect('/');
        })
    })

    //Solicitudes POST en el registro
    app.post("/register", async (req, res) => {
        const { correo,nombre,celular,comuna,direccion,nacimiento,pass} = req.body;
        console.log(req.body);
        let passwordHaash = await bcryptjs.hash(pass, 8);
        connection.query("INSERT INTO users SET ?", {
            correo: correo,
            nombre:nombre,
            celular: celular,
            comuna: comuna,
            direccion: direccion,
            nacimiento:nacimiento,
            pass:passwordHaash,
        }, async(error, results) => {
            if(error){
                console.log(error);
            } else {
                res.render('../views/register.ejs', {
                    alert:true,
                    alertTitle:'Registration',
                    alertMessage:'Successful Registration',
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer:1500,
                    ruta:''
                })
            }
        })
    })


    // Solicitud POST en Formulario de contacto
    app.post('/contacto', (req,res) =>{
        const {nombre,numerocontacto,mensaje} = req.body
        console.log(req.body)
        connection.query('INSERT INTO contacto SET ?' , {
            nombre : nombre ,
            numerocontacto : numerocontacto,
            mensaje : mensaje
        }, (error,result) => {
            if(error){
                console.log(error)
            } else {
                res.redirect('/')


            }
        })
    } )


   
    //Solicitud POST de login
    app.post('/auth', async (req,res) => {
        const {correo,pass} = req.body;
        if(correo === process.env.CORREO_ADMIN && pass === process.env.PASS_ADMIN){
            connection.query('SELECT * FROM contacto' , (err, results) => {  
                if(err){
                    console.log(err)
                } else{
                    res.render('../views/administrador.ejs' , {
                        con : results
                    })
                }
            })
        }
        let passwordHaash = await bcryptjs.hash(pass, 8);

        if(correo && pass){
            connection.query('SELECT * FROM users WHERE correo = ?', [correo], async (err, results) => {
                console.log(results);
                if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].pass))){

                    res.render('../views/login.ejs', {
                        //login incorrecto sw2
                        alert:true,
                        alertTitle:'Error',
                        alertMessage:'Correo y/o contraseña incorrectas',
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:6000,
                        ruta:'login'
                    });
                } else {
                    req.session.loggedin = true;
                    req.session.name = results[0].name;
                    res.render('../views/login.ejs', {
                        //login correcto sw2
                        alert:true,
                        alertTitle:'Conexión exitosa',
                        alertMessage:'Login Correcto',
                        alertIcon:'success',
                        showConfirmButton:false,
                        timer:1500,
                        ruta:''
                    });
                }
            })
        }
    })


}

