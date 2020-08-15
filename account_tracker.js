const { getApiCallsByDate, getApiCallsByMinute, postApiCalls } = require('./server/models/apiCalls.js');
const { dateConverter } = require('./dateConverter.js');

// ==========================================
// tracking api requests for user accounts
// Free accounts have X number of api calls per day
// premium accounts have X number of api calls per minute
// returns {success:true} if approved, {success:false} if api limit is hit
// ==========================================

module.exports.accountTracker = (userID, membershipTier, endpoint) => {
    return new Promise( async (resolve, reject) => { 

        // set the number of calls available for free and premium accounts per day
        let freeLimit = 5;
        let premiumLimit = 1000;
        
        // hold the number of api calls from user per day
        let numOfCalls;

        // handle free account limits
        if (membershipTier === 'free') {
            // free accounts are limited by minute
            await getApiCallsByMinute(userID)
                .then(response => {
                    // set number of call reference
                    numOfCalls = response.rowCount;
                    if (numOfCalls === 0) {
                        // if no calls yet
                        numOfCalls = 1;
                        return;

                    } else if (numOfCalls > freeLimit) {
                        console.log('API call limit hit');
                        // resolve to false to hit limit error
                        resolve({ success: false });
                    }
                })
                .catch(err => {
                    console.log('Error getting API calls for user', err);
                    reject({ success: false });
                });
        }

        // handle premium account limits
        if (membershipTier === 'premium') {
            // premium account is limited by day
            await getApiCallsByDate(userID)
                .then(response => {
                    // set number of call reference
                    numOfCalls = response.rowCount;
                    // if no calls yet
                    if (response.rowCount === 0) {
                        numOfCalls = 1;
                        return;

                    } else if (numOfCalls > premiumLimit) {
                        console.log('API call limit hit');
                        // resolve to false to hit limit error
                        resolve({ success: false });
                    }
                })
                .catch(err => {
                    console.log('Error getting API calls for user', err);
                    reject({ success: false });
                });
        }

        // =============================
        // IF ALL ABOVE CHECKS ARE PASSED
        // =============================

        // POST API call
        await postApiCalls(userID, endpoint)
            .then(response => {
                resolve({ success: true });
            })
            .catch(err => {
                console.log('Error posting API call for user', err);
                reject({ success: false });
            });
    });
};