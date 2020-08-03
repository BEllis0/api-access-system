const { dbConnection } = require('../../database/config.js');

// Add a new (user associated) api key to the api_keys table
module.exports.addApiKey = (apiKeyObj, membership_tier) => {
    return new Promise((resolve, reject) => {

        let query = `INSERT INTO api_limiter.api_keys(
            membership_tier, 
            api_key, 
            uuid, 
            user_associated
            ) VALUES (
            '${membership_tier}', 
            '${apiKeyObj.apiKey}', 
            '${apiKeyObj.uuid}',
            (SELECT id FROM api_limiter.users WHERE
                api_key = '${apiKeyObj.apiKey}')
            );`;

        dbConnection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};