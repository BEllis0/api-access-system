const { dbConnection } = require('../../database/config.js');

module.exports.insertCompanies = (companyName, companySuffix, suffix, catchPhrase, companyImage, addressStreet, addressState) => {
    return new Promise((resolve, reject) => {
        // sql query string
        let companyInsertQuery = {
            text: `INSERT INTO api_limiter.companies(
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

module.exports.insertProducts = (productName, department, productImage, color, productMaterial, productAdj, price) => {
    return new Promise((resolve, reject) => {
        let productInsertQuery = {
            text: `INSERT INTO api_limiter.products(
                product_name,
                department,
                product_image,
                color,
                product_material,
                product_adj,
                price
            ) VALUES($1, $2, $3, $4, $5, $6, $7)`,
            values: [
                `${productName}`,
                `${department}`,
                `${productImage}`,
                `${color}`,
                `${productMaterial}`,
                `${productAdj}`,
                `${price}`
            ]
        };

        dbConnection.query(productInsertQuery, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};