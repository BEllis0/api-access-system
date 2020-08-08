const { getApiCalls, postApiCalls } = require('./server/models/apiCalls.js');

// ==========================================
// tracking api requests for user accounts
// Free accounts have X number of api calls per day
// premium accounts have X number of api calls per minute
// returns true if approved, false if api limit is hit
// ==========================================

module.exports.accountTracker = (userID, membershipTier, endpoint) => {
    return new Promise((resolve, reject) => { 
        if (membershipTier === 'free') {

        }

        if (membershipTier === 'premium') {

        }
        

        getApiCalls(userID)
            .then(response => {
                console.log('API calls from user', response);
                resolve();
            })
            .catch(err => {
                console.log('Error getting API calls for user', err);
                reject();
            })
        // hold the value of the current day, 
        // define on first call of the day and 
        // only change when day changes
        let dayReference = undefined;

        // getting current day
        let date = new Date();
        let currentDay = date.getDay();

        // hold the number of api calls from user per day
        let numOfCalls = 0;

        // set initial date
        if (dayReference === undefined) {
            dayReference = currentDay;
            numOfCalls = 1;
        } else {

        }
    });
};