const { dbConnection } = require('../../database/config.js');

module.exports.insertCompanies = (companyName, companySuffix, suffix, catchPhrase, companyImage, addressStreet, addressState) => {
    return new Promise((resolve, reject) => {
        // sql query string
        let companyInsertQuery = {
            text: `INSERT INTO companies(
                company_name,
                company_suffix,
                suffix,
                catch_phrase,
                company_image,
                address_street,
                address_state
            ) VALUES($1, $2, $3, $4, $5, $6, $7)`,
            values: [
                `${companyName}`,
                `${companySuffix}`,
                `${suffix}`,
                `${catchPhrase}`,
                `${companyImage}`,
                `${addressStreet}`,
                `${addressState}`
            ]
        };

        // add to db
        dbConnection.query(companyInsertQuery, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports.insertProducts = () => {
    return new Promise((resolve, reject) => {
        
    });
};

module.exports.insertStocks = () => {
    return new Promise((resolve, reject) => {
        
    });
};