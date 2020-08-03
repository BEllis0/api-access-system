const { selectAllProducts, selectProductsByParams } = require('../models/products.js');

module.exports = {
    products: {

        // **** create checkIfLoggedIn func and run it on api request
        // check if user is logged in (has api key param)

        // if no api key, restrict api calls
            // use api_cost_tracker to monitor and track user reqs


            // add request entry to db api call table

            // run select companies func and return data
        
        // all products
        all: (req, res) => {

            // check if user is logged in (has api key in body)
            if (!req.query.key) {
                res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
            }

            selectAllProducts()
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
            name: (req, res) => {

                // check if user is logged in (has api key in body)
                if (!req.query.key) {
                    res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
                }

                selectProductsByParams('name', req.params.name)
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
            priceRange: (req, res) => {

                // check if user is logged in (has api key in body)
                if (!req.query.key) {
                    res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
                }

                selectProductsByParams('price', req.params.min, req.params.max)
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
            color: (req, res) => {

                // check if user is logged in (has api key in body)
                if (!req.query.key) {
                    res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
                }

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