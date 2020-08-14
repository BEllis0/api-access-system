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

        let query;

        if (colName === 'price') {
            query = `SELECT *
                FROM api_limiter.products
                WHERE ${colName} BETWEEN ${params[0]} AND ${params[1]}`
        } else {
            query = `SELECT * 
                FROM api_limiter.products
                WHERE ${colName}='${params[0]}'`;
        }

        dbConnection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};