const { DATABASE: { URL, DB_NAME } } = require('_config');
const mongoose = require('mongoose');
/**
 * @type {mongoose.Connection}
 */
let dbConnection;

module.exports = {
    getDBConnection: function () {
        if (!dbConnection) {
            dbConnection = mongoose.connect(URL, { dbName: DB_NAME, maxPoolSize: 10 });
        }
        return dbConnection;
    },
    closeConnection: function () {
        if (dbConnection && dbConnection.readyState === 1) {
            dbConnection.close();
        }
    }
};
