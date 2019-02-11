const express   = require("express");
const bodyparser = require('body-parser');
const path      = require('path');
const app       = express();
const http      = require('http').Server(app);
const io        = require('socket.io')(http);

// Requiere de carpetas y Archivos
const web = require('./routes/web.js');

//Configuraciones Generales
app.set(3000, process.env.PORT || 3000)
app.set('socket.io', io);

//Sockets
//conexion de sockets
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


//CONFIGURACION DE APP
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

//Archivo de rutas
app.use("/", web);

//Ejs middleware
app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Subir el servidor
http.listen(app.get(3000), () => {
    console.info("Servidor Arrancando en el puerto: 3000")
})