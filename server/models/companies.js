const { dbConnection } = require('../../database/config.js');

module.exports.selectAllCompanies = () => {
    return new Promise((resolve, reject) => {
        let selectAllQuery = 'SELECT * FROM api_limiter.companies';
    
        dbConnection.query(selectAllQuery, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};