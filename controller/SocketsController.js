const express 	= require("express");
var app = express();
const mysql = require("../config/database")
const {registrarAsistencia} = require("../utils/sql")
const moment = require("moment")
var router = express.Router();
var path = require('path');

module.exports = {
	send: async function(req, res){

        const database = await mysql.conexionApp()
        const fecha = moment().format()
        console.log("Se viene la fechaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(fecha)
        if(database) {
            try {
                const [rows, fields] = await database.query(registrarAsistencia, [req.query.e,req.query.s,req.query.c,req.query.p,req.query.a, fecha])
                console.log("Estudiante ingresado correctamente en la asistencia")
            } catch (error) {
                console.log("Erro ingresando el estudiante a la lista en la base de datos :(" + error)
            }
        }
        
		var io = req.app.get('socket.io'); 
		  io.emit('sendToClient', { 
              id: req.query.e,
		  });
		res.send("<h1>Enviado</h1>")
	}
}
