const { selectAllCompanies, selectCompaniesByParams } = require('../models/companies.js');
const { apiKeyValidation } = require('../../api_key_validation.js');
const { accountTracker } = require('../../account_tracker.js');

module.exports = {
    companies: {
        all: async (req, res) => {
            
            // ===================================
            // check if user is logged in (has api key in query params)
            // ===================================
            
            if (!req.query.key) {
                res.status(401).json({ 
                    success: false,
                    status: 401,
                    message: 'Unauthorized: API key not found on request body',
                    error: 'API key required'
                });
            }

            
            // ===================================
            // pass api key into validation function
            // ===================================
            
            // trim endpoint to remove api key param
            let endpoint = req.originalUrl.slice(0, req.originalUrl.indexOf('?'));

            await apiKeyValidation(req.query.key)
                .then(response => {
                    // return results from account tracker function
                    return accountTracker(response.user_associated, response.membership_tier, endpoint);
                })
                .then(data => {
                    // handle true / false
                    if (data.success === false) {
                        res.status(429).json({
                            success: false,
                            status: 429,
                            message: 'Account limit hit. Upgrade for access.',
                            error: 'API call limit hit' 
                        });
                    }
                })
                .catch(err => {
                    res.status(401).json({
                        success: false,
                        status: 401,
                        message: 'Unauthorized: API key not valid',
                        error: 'API key not valid' 
                    });
                });

            // ===================================
            // get all company data and serve
            // ===================================
            
            await selectAllCompanies()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    console.log(`Error querying all companies`, err);
                    res.status(400).json({ message: 'Error', error: err });
                });
        },
        searchBy: {
            // individual products - by name
            name: (req, res) => {

                // check if user is logged in (has api key in query params)
                if (!req.query.key) {
                    res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
                }

                selectCompaniesByParams('name', req.params.name)
                    .then(data => {
                        console.log('company search by name', data);
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log('Error querying company by name', err);
                        res.status(400).json({ message: 'Error', error: err });
                    });
            },
            // products based on price range
            suffix: (req, res) => {

                // check if user is logged in (has api key in body)
                if (!req.query.key) {
                    res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
                }

                selectCompaniesByParams('suffix', req.params.suffix)
                    .then(data => {
                        console.log('company search by suffix', data);
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log('Error querying company by suffix', err);
                        res.status(400).json({ message: 'Error', error: err });
                    });
            },
            // products based on color
            state: (req, res) => {

                // check if user is logged in (has api key in body)
                if (!req.query.key) {
                    res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
                }

                selectCompaniesByParams('state', req.params.state)
                    .then(data => {
                        console.log('company search by state', data);
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log('Error querying company by state', err);
                        res.status(400).json({ message: 'Error', error: err });
                    });
            }
        }
    }
};