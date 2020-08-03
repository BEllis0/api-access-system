const { selectAllCompanies, selectCompaniesByParams } = require('../models/companies.js');

module.exports = {
    companies: {
        all: (req, res) => {

        // check if user is logged in (has api key in query params)
        if (!req.query.key) {
            res.status(401).json({ message: 'Unauthorized: API key not found on request body', error: 'API key required' });
        }

        // if no api key, restrict api calls
            // use api_cost_tracker to monitor and track user reqs


            // add request entry to db api call table

            // run select companies func and return data
            selectAllCompanies()
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