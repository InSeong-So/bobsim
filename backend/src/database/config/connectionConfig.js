const {db} = require("../../enviroment/properties");

module.exports = {
    host: db.getDbHost(),
    user: db.getDbUser(),
    password: db.getDbPassword(),
    port: db.getDbPort(),
    database: db.getDbUseDatabase(),
    multipleStatements: db.getDbOptions().multipleStatements,
};