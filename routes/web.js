var express     = require("express");
var router = express.Router();

// LLAMADO DE CONTROLADORES
const CalendarioController = require('../controller/CalendarioController')
const SocketsController = require('../controller/SocketsController')
const AsistenciaController = require('../controller/AsistenciaController')

//CALENDARIO
router.get("/" , CalendarioController.dash);
router.get("/data" , CalendarioController.informacionDash);

//QR
router.get("/asistencia" , AsistenciaController.dash);


//Sockets
router.get("/sockets", SocketsController.send)

module.exports = router;