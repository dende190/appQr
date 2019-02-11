const express = require('express');
const mysql = require("../config/database")
const router = express.Router();

module.exports = {
	dash: function(req, res){
		res.render('calen.ejs', {
			'prueba': "hola mundo"
		})
    },
    informacionDash: async function(req, res) {

        try {
            const dataBase = await mysql.conexionApp()
        } catch (error) {
            console.log(error)
        }

        res.send("datos")
    }
}