const express = require('express');
const mysql = require("../config/database")
const moment = require('moment')
const router = express.Router();
const {listaClases} = require('../utils/sql')

module.exports = {
    vista: function(req,res){        
        res.render('listaClases.ejs', {
        })
    },
    datos: async function(req,res){
        let result
        let fecha = moment().format("YYYY-MM-DD")
        const dataBase = await mysql.conexionApp()
        if (dataBase) {
            try {
                let [rows, fields] = await dataBase.query(listaClases);
                result = rows;
            } catch (e) {
                console.log("(ERROR)" + e);
            }
        }
        dataBase.end()
        
        arrayJson = []
        arrayJsonTemp = []
        arrayEstudiates = []
        arrayClase = []
        temp = []
        for (let datos of result) {
            for (let datos2 of result) {
                
                if (datos.id_nivel == datos2.id_nivel) {
                    arrayEstudiates.push({
                        nombre: datos2.nombre_estudiante.toLowerCase(),
                        asistencia: 0
                    })
                }
                if (datos.id_nivel != arrayJsonTemp.id_nivel) {
                    arrayJson.push({
                        start_date: fecha + " " + datos.hora_inicio,
                        end_date: fecha + " " + datos.hora_final,
                        clase: datos.modalidad + " " + datos.nivel,
                        profesor: datos.nombre_profesor + " " + datos.apellido_profesor,
                        salon: datos.salon,
                        estudiantes: arrayEstudiates,
                    })
                    arrayJsonTemp = {
                        id_nivel: datos.id_nivel
                    }
                }
            }
            arrayEstudiates = []
        }
        res.send({data:arrayJson})
    }
}