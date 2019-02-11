const express 	= require("express");
var app = express();

var router = express.Router();
var path = require('path');

module.exports = {
	send: function(req, res){
		var io = req.app.get('socket.io'); 
		  io.emit('sendToClient', { 
              nombre: req.query.nombre,
              id: req.query.id,
		  });
		res.send("<h1>Enviado</h1>")
	}
}
