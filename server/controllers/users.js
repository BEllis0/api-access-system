const { addUser } = require('../models/users.js');
const { generateApiKey } = require('../../api_key_generator.js');
const { addApiKey } = require('../models/apiKeys.js');
const bcrypt = require('bcrypt');

module.exports = {
    users: {
        new: async (req, res) => {

            // ======================
            // TODO: require username length, password specifics
            // ======================

            // user's account information in request body
            let firstName = req.body.first_name;
            let lastName = req.body.last_name;
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let membership = req.body.membership || 'free';

            // generate a new api key OBJECT (uuid, apiKey) for the user
            let newUserApiKey = generateApiKey();

            // ========================
            // generate hashed password
            // ========================
            
            // reference to hashed password that is generated below
            let hashedPass;

            await bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log('Error hashing password', err);
                } else {
                    // save hashed password
                    hashedPass = hash;
                }
            });
            
            // ========================
            // add new user to DB with hashed password
            // ========================
            
            await addUser(firstName, lastName, username, hashedPass, email, membership, newUserApiKey.apiKey)
                .then(response => {
                    console.log('User created');
                })
                .catch(err => {
                    console.log("Error creating new user", err);
                    res.status(400).json({ message: 'error creating new user', error: err });
                });
            
            // ========================
            // add api key to api_keys table
            // ========================
            
            await addApiKey(newUserApiKey, membership)
                .then(response => {
                    res.status(201).json({ message: "new user created; api key added", data: response });
                })
                .catch(err => {
                    console.log('Error adding api key to table', err);
                    res.status(400).json({ message: 'Error adding api key to table', error: err });
                });
        },
        validate: (req, res) => {

        }
    }
}