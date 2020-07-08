const router = require('express').Router();
const usersController = require('../controllers/users.js');

// create new user
router.post('/new', usersController.users.new);

// validate user
router.post('/validate', usersController.users.validate);

module.exports = router;