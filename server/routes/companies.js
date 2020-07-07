const router = require('express').Router();
const companiesControllers = require('../controllers/companies.js');

// all companies
router.get('/', companiesControllers.companies.all);

// by name
router.get('/:name', companiesControllers.companies.searchBy.name);

// by suffix
router.get('/:suffix', companiesControllers.companies.searchBy.suffix);

// by state
router.get('/:state', companiesControllers.companies.searchBy.state);

module.exports = router;