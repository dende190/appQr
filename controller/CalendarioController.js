var express = require('express');
var router = express.Router();

module.exports = {
	dash: function(req, res){
		res.render('calen.ejs', {
			'prueba': "hola mundo"
		})
	}
}