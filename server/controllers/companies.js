const { selectAllCompanies } = require('../models/companies.js');

module.exports = {
    companies: {
        all: (req, res) => {

        // check if user is logged in (has api key param)

        // if no api key, restrict api calls
            // use api_cost_tracker to monitor and track user reqs


            // add request entry to db api call table

            // run select companies func and return data
            selectAllCompanies()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    console.log(`Error selecting and returning all companies: ${err}`);
                    res.status(400).json({ message: 'Error', error: err });
                });
        },
        searchBy: {
            // individual products - by name
            name: (req, res) => {

            },
            // products based on price range
            suffix: (req, res) => {

            },
            // products based on color
            state: (req, res) => {

            }
        }
    }
};