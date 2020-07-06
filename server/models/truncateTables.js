const { dbConnection } = require('../../database/config.js');

module.exports.truncateTables = (...tableNames) => {
    return new Promise((resolve, reject) => {
        // iterate through table names that were passed in
        tableNames.forEach(tableName => {
            // truncate
            dbConnection.query(`TRUNCATE TABLE ${tableName}`, (err, res) => {
                if (err) {
                    console.log(`Error truncating table: ${tableName} - ${err}`);
                    reject(err);
                } else {
                    console.log(`Table truncated: ${tableName}`);
                    resolve(res);
                }
            });
        });
    });
};