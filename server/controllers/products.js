const { selectAllProducts, selectProductsByParams } = require('../models/products.js');
const { apiKeyValidation } = require('../../api_key_validation.js');
const { accountTracker } = require('../../account_tracker.js');

module.exports = {
    products: {
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

            await selectAllProducts()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    console.log('Error querying all products', err);
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
                // get all company data and serve
                // ===================================

                await selectProductsByParams('name', req.params.name)
                    .then(data => {
                        console.log('product search by name', data);
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log('Error querying products by name', err);
                        res.status(400).json({ message: 'Error', error: err });
                    });
            },
            // products based on price range
            priceRange: async (req, res) => {

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

                await selectProductsByParams('price', req.params.min, req.params.max)
                    .then(data => {
                        console.log('product search by price', data);
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log('Error querying products by price', err);
                        res.status(400).json({ message: 'Error', error: err });
                    });
            },
            // products based on color
            color: async (req, res) => {

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

                selectProductsByParams('name', req.params.color)
                    .then(data => {
                        console.log('product search by color', data);
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log('Error querying products by color', err);
                        res.status(400).json({ message: 'Error', error: err });
                    });
            }
        }
    }
};