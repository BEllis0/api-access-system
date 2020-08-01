const { addUser } = require('../models/users.js');
const { generateApiKey } = require('../../api_key_generator.js');
const bcrypt = require('bcrypt');

module.exports = {
    users: {
        new: (req, res) => {

            // TODO: require username length, password specifics

            // user's account information
            let firstName = req.body.first_name;
            let lastName = req.body.last_name;
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let membership = req.body.membership || 'free';

            // generate a new api key for the user
            let newUserApiKey = generateApiKey().apiKey;

            // generate hashed password
            // bcrypt.hash(password, 10, (err, hash) => {

            // }); 

            // create new user in db
            addUser(firstName, lastName, username, password, email, membership, newUserApiKey)
                .then(response => {
                    console.log('new user created', response);
                    res.status(201).json({ message: "new user created", data: response });
                })
                .catch(err => {
                    console.log("Error creating new user", err);
                    res.status(400).json({ message: 'error creating new user', error: err });
                });

        },
        validate: (req, res) => {

        }
    }
}