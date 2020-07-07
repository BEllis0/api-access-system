const { dbConnection } = require('../../database/config.js');

module.exports.selectAllProducts = () => {
    return new Promise((resolve, reject) => {
        let selectAllQuery = 'SELECT * FROM api_limiter.products';

        dbConnection.query(selectAllQuery, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};