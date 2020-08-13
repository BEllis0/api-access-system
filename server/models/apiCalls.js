const { dbConnection } = require('../../database/config.js');

// get all api calls from user
module.exports.getApiCalls = userID => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM api_limiter.api_calls WHERE user_requested = ${userID}`;

        dbConnection.query(query, (err, res) => { 
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
};

// get api calls on specific date
module.exports.getApiCallsByDate = userID => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * 
            FROM api_limiter.api_calls 
            WHERE user_requested = ${userID} 
            AND _date >= now()::date + interval '1h';`;

        dbConnection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

// post api call
module.exports.postApiCalls = (userID, endpoint) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO api_limiter.api_calls(
            _endpoint,
            success,
            user_requested
        ) VALUES(
            '${endpoint}',
            true,
            ${userID}
        )`;

        dbConnection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};