let registrarAsistencia = `INSERT INTO asistencia_estudiante (id_estudiante, id_salon, id_clase, id_profesor, en_clase, hora_registro )
                            VALUES (?,?,?,?,?,?)`;
const calendarioClases = "SELECT clase.id AS id_clase, profesor.nombres AS nombre_profesor, profesor.apellidos AS apellido_profesor, modalidad.nombre AS modalidad, nivel.nombre AS nivel, salon.nombre AS salon, clase.hora_inicio, clase.hora_final, estudiante.nombres AS nombre_estudiante, estudiante.apellidos AS apellido_estudiante, estudiante.id AS id_estudiante, salon.id AS id_salon FROM clase INNER JOIN salon ON salon.id = clase.id_salon INNER JOIN curso ON curso.id = clase.id_curso INNER JOIN nivel ON nivel.id = curso.id_nivel INNER JOIN modalidad ON modalidad.id = curso.id_modalidad INNER JOIN clase_estudiante ON clase_estudiante.id_clase = clase.id INNER JOIN estudiante ON estudiante.id = clase_estudiante.id_estudiante INNER JOIN clase_profesor ON clase_profesor.id_clase = clase.id INNER JOIN profesor ON profesor.id = clase_profesor.id_profesor WHERE clase.fecha_final > '2019-02-12 00:00:00'"
module.exports = {
    registrarAsistencia,
    calendarioClases
}