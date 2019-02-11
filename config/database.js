const mysql = require("mysql2/promise");
const {
    DB_HOST2,
    DB_USER2,
    DB_PASS2,
    DB_DATABASE_APP,
} = require("./config.json");

module.exports = {
    conexionApp: async function connect() {
        try {
            const c = await mysql.createConnection({
                host: DB_HOST2,
                user: DB_USER2,
                password: DB_PASS2,
                database: DB_DATABASE_APP
            });
            console.log("Base de datos IPCONSULTORES conectada");
            return c;
        } catch (e) {
            console.log(
                "(ERROR) Error en la conexion a la base de datos IPCONSULTORES\n" +
                    e
            );
            return (c = false);
        }
    }
};
