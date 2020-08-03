const { dbConnection } = require('../../database/config.js');

// select all, no params
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

// select data in column by params
module.exports.selectCompaniesByParams = (colName, ...params) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT *
                FROM api_limiter.companies
                WHERE ${colName}="${params[0]}"`;

        dbConnection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};