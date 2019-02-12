let registrarAsistencia = `INSERT INTO asistencia_estudiante (id_estudiante, id_salon, id_clase, id_profesor, en_clase, hora_registro )
                            VALUES (?,?,?,?,?,?)`;

module.exports = {
    registrarAsistencia
}
