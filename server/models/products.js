const { dbConnection } = require('../../database/config.js');

// select all, no params
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

// select data in column by params
module.exports.selectProductsByParams = (colName, ...params) => {
    return new Promise((resolve, reject) => {
        let query = {
            text: ``,
            values: []
        };

        dbConnection(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};