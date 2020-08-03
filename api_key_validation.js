const { dbConnection } = require('./database/config.js');

module.exports.apiKeyValidation = (apiKey) => {
    return new Promise((resolve, reject) => {

        let query = `SELECT * FROM api_limiter.api_keys WHERE api_key = '${apiKey}';`;
        console.log('QUERYYYY', query);
        dbConnection(query, (err, res) => {
            if (err) {
                console.log('ERRROROROROROR')
                reject(err);
            } else {
                console.log('WORKEDDDDDDD')
                resolve(res);
            }
        });
    });
};