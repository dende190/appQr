const express = require('express');
const mysql = require("../config/database")
const router = express.Router();

const query = "SELECT clase.id AS id_clase, profesor.nombres AS nombre_profesor, profesor.apellidos AS apellido_profesor, modalidad.nombre AS modalidad, nivel.nombre AS nivel, salon.nombre AS salon, clase.hora_inicio, clase.hora_final, estudiante.nombres AS nombre_estudiante, estudiante.apellidos AS apellido_estudiante, estudiante.id AS id_estudiante, salon.id AS id_salon FROM clase INNER JOIN salon ON salon.id = clase.id_salon INNER JOIN curso ON curso.id = clase.id_curso INNER JOIN nivel ON nivel.id = curso.id_nivel INNER JOIN modalidad ON modalidad.id = curso.id_modalidad INNER JOIN clase_estudiante ON clase_estudiante.id_clase = clase.id INNER JOIN estudiante ON estudiante.id = clase_estudiante.id_estudiante INNER JOIN clase_profesor ON clase_profesor.id_clase = clase.id INNER JOIN profesor ON profesor.id = clase_profesor.id_profesor WHERE clase.fecha_final > '2019-02-12 00:00:00'"

module.exports = {
	dash: async function(req, res){
        res.render('calen.ejs', {
            'prueba': "hola mundo"
        })
    },
    informacionDash: async function(req, res) {

        let result
        const dataBase = await mysql.conexionApp()
        if (dataBase) {
            try {
                let [rows, fields] = await dataBase.query(query);
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