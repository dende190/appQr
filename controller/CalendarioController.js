const express = require('express');
const mysql = require("../config/database")
const router = express.Router();
const moment = require('moment')
const crypto = require('crypto');
const assert = require('assert');
const {calendarioClases,asistenciaEstudiantes} = require('../utils/sql')


module.exports = {
    dash: function (req, res) {

        
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = '1';
        var text = 'laverde';
        
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
        let fecha = moment().format("YYYY-MM-DD")
        let result
        let asistencias
        const dataBase = await mysql.conexionApp()
        if (dataBase) {
            try {
                let [rows, fields] = await dataBase.query(calendarioClases, fecha);
                result = rows;
            } catch (e) {
                console.log("(ERROR)" + e);
            }
            try {
                let [rows, fields] = await dataBase.query(asistenciaEstudiantes, `${fecha}%`);
                asistencias = rows;
                console.log(asistencias)
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
        let i = 1
        for (let datos of result) {
            for (let datos2 of result) {
                
                if (datos.id_clase == datos2.id_clase) {
                    arrayEstudiates.push({
                        id: datos2.id_estudiante,
                        nombre: datos2.nombre_estudiante.toLowerCase(),
                        asistencia: 0
                    })
                }
                if (datos.id_clase != arrayJsonTemp.id_clase) {
                    arrayJson.push({
                        id: i,
                        id_clase: datos.id_clase,
                        start_date: fecha + " " + datos.hora_inicio,
                        end_date: fecha + " " + datos.hora_final,
                        clase: datos.modalidad + " " + datos.nivel,
                        profesor: datos.nombre_profesor + " " + datos.apellido_profesor,
                        estudiantes: arrayEstudiates,
                        section_id: datos.id_salon,
                    })
                    arrayJsonTemp = {
                        id_clase: datos.id_clase
                    }
                    i++
                }
            }
            arrayEstudiates = []
        }
        // console.log(arrayJson)
        for(let asistencia of asistencias) {
            for(clase of arrayJson) {
                for(estudiante of clase.estudiantes) {
                    if(asistencia.id_estudiante == estudiante.id) {
                        estudiante.asistencia = 1
                        console.log('existe un estudiante en la lista de asistidos')
                    }
                }
            }
        }

        res.send(arrayJson)
    }
}