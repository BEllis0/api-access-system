const { selectAllProducts } = require('../models/products.js');

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
            selectAllProducts()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    console.log(`Error selecting and serving all products: ${err}`);
                    res.status(400).json({ message: 'Error', error: err });
                });
        },
        searchBy: {
            // individual products - by name
            name: (req, res) => {

            },
            // products based on price range
            priceRange: (req, res) => {
                // min and max params to get range
            },
            // products based on color
            color: (req, res) => {

            }
        }
    }
};