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
            name: async (req, res) => {

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
                // get company data by name params and serve
                // ===================================


                await selectCompaniesByParams('company_name', req.query.name)
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log('Error querying company by name', err);
                        res.status(400).json({ message: 'Error', error: err });
                    });
            },
            // products based on price range
            suffix: async (req, res) => {
               
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
                // get company data by suffix param and serve
                // ===================================
                
                await selectCompaniesByParams('company_suffix', req.query.suffix)
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
            state: async (req, res) => {

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
                // get company data by state param and serve
                // ===================================

                await selectCompaniesByParams('address_state', req.query.state)
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