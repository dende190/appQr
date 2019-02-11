const mysql = require('mysql2/promise');
const logger = require("../logs/logger")
const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE_NAGIOS, DB_DATABASE_OCS, DB_DATABASE_GLPI, DB_HOST2, DB_USER2, DB_PASS2, DB_DATABASE_NAGIOS2, DB_DATABASE_IPCONSULTORES } = require("./config.json");

module.exports = {
  conexionIpconsultores: async function connect() {
		try {
			const c = await mysql.createConnection({
				host: DB_HOST2,
				user: DB_USER2,
				password: DB_PASS2,
				database: DB_DATABASE_IPCONSULTORES
			});
			logger.info('Base de datos IPCONSULTORES conectada');
			return c;
		} catch(e) {
			logger.error("(ERROR) Error en la conexion a la base de datos IPCONSULTORES\n" + e);
			return c = false;
		}
  },
}
