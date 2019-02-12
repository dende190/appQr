const express = require('express');
const mysql = require("../config/database")
const router = express.Router();
var crypto = require('crypto');
var assert = require('assert');
const {calendarioClases} = require('../utils/sql')


module.exports = {
    dash: function (req, res) {

        
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = '123456789-Aa';
        var text = 'Ha$lo Pablito el kpito';
        
        var cipher = crypto.createCipher(algorithm, key);  
        var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
        var decipher = crypto.createDecipher(algorithm, key);
        var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
        
        assert.equal(decrypted, text);
        console.log("Se viene la encriptada")
        console.log(encrypted)
        console.log("Se viene la desencriptada")

        console.log(decrypted)

        res.render('calen.ejs', {
        })
    },
    informacionDash: async function (req, res) {

        let result
        const dataBase = await mysql.conexionApp()
        if (dataBase) {
            try {
                let [rows, fields] = await dataBase.query(calendarioClases);
                result = rows;
            } catch (e) {
                console.log("(ERROR)" + e);
            }
            dataBase.end()
        }

        // clase = []
        arrayJson = []
        arrayJsonTemp = []
        arrayEstudiates = []
        temp = []
        for (let datos of result) {
            for (let datos2 of result) {
                if (datos.id_clase == datos2.id_clase) {
                    arrayEstudiates.push({
                        id: datos2.id_estudiante,
                        nombre: datos2.nombre_estudiante.toLowerCase()
                    })
                }
                if (datos.id_clase != arrayJsonTemp.id_clase) {
                    arrayJson.push({
                        id_clase: datos.id_clase,
                        start_date: "2019-02-12 " + datos.hora_inicio,
                        end_date: "2019-02-12 " + datos.hora_final,
                        clase: datos.modalidad + " " + datos.nivel,
                        profesor: datos.nombre_profesor + " " + datos.apellido_profesor,
                        estudiantes: arrayEstudiates,
                        section_id: datos.id_salon,
                    })
                    arrayJsonTemp = {
                        id_clase: datos.id_clase
                    }
                }
            }
            arrayEstudiates = []
        }

        res.send(arrayJson)
    }
}