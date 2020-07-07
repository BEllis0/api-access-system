const { dbConnection } = require('../../database/config.js');

// NEED FUNCTION TO CHECK LOGIN CREDS 



module.exports.addUser = (firstName, lastName, username, email, membership, apiKey) => {
    return new Promise((resolve, reject) => {
        let addUserQuery = {
            text: `INSERT INTO api_limiter.users(
                first_name,
                last_name,
                email_address,
                username,
                membership_tier,
                api_key
            ) VALUES ($1, $2, $3, $4, $5, $6)`,
            values: [
                `${firstName}`,
                `${lastName}`,
                `${email}`,
                `${username}`,
                `${membership}`,
                `${apiKey}`
            ]
        };

        dbConnection.query(addUserQuery, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};