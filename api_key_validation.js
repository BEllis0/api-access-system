const { dbConnection } = require('./database/config.js');

module.exports.apiKeyValidation = (apiKey) => {
    return new Promise((resolve, reject) => {

        let query = `SELECT * FROM api_limiter.api_keys WHERE api_key = '${apiKey}';`;
        
        dbConnection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.rows[0]);
            }
        });
    });
};