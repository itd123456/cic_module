require("dotenv").config();
const dbConfig = {
    user:  process.env.SQLUSER,
    password: process.env.SQLPASS,
    server: process.env.SQLSRV,
    database: process.env.SQLDB,
    options: {
        "enableArithAbort": true,
        "encrypt":false
    }
};
module.exports = dbConfig;