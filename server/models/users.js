const { dbConnection } = require('../../database/config.js');

// NEED FUNCTION TO CHECK LOGIN CREDS 



module.exports.addUser = (firstName, lastName, username, password, email, membership = 'free', apiKey) => {
    return new Promise((resolve, reject) => {
        let addUserQuery = {
            text: `INSERT INTO api_limiter.users(
                first_name,
                last_name,
                email_address,
                username,
                password,
                membership_tier,
                api_key
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            values: [
                `${firstName}`,
                `${lastName}`,
                `${email}`,
                `${username}`,
                `${password}`,
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