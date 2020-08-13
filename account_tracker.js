const { getApiCallsByDate, postApiCalls } = require('./server/models/apiCalls.js');
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
        let premiumLimit = 50;
        
        // hold the number of api calls from user per day
        let numOfCalls;

        // GET all API calls from user
        await getApiCallsByDate(userID)
            .then(response => {
                // handle first API call from user; none in database
                if (response.rowCount === 0) {
                    numOfCalls = 1;
                    return;
                } else {
                    numOfCalls = response.rowCount;

                    // handle free account tier
                    if (membershipTier === 'free') {
                        // if more than free allotted calls today
                        if (numOfCalls > freeLimit) {
                            console.log('API call limit hit');
                            // resolve to false to hit limit error
                            resolve({ success: false });
                        } else {
                            resolve({ success: true });
                        }
                    }
            
                    // handle premium account tier
                    if (membershipTier === 'premium') {
                        // if more than premium allotted calls today
                        if (numOfCalls > premiumLimit) {
                            console.log('API call limit hit');
                            // resolve to false to hit limit error
                            resolve({ success: false });
                        } else {
                            resolve({ success: true });
                        }
                    }
                }
            })
            .catch(err => {
                console.log('Error getting API calls for user', err);
                reject({ success: false });
            });

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