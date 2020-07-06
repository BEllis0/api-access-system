const faker = require('faker');
const { insertCompanies } = require('./server/models/seedFunctions.js');
const { truncateTables } = require('./server/models/truncateTables.js');

// number of entries to add to db
const numOfEntries = 100;

// companies data
const seedCompany = () => {
    for (let i = 0; i < numOfEntries; i++) {
        // data categories
        let companyName = faker.company.companyName();
        let suffix = faker.company.suffixes();
        let companySuffix = faker.company.companySuffix();
        let catchPhrase = faker.company.catchPhrase();
        let companyImage = faker.image.business();
        let companyAddressStreet = faker.address.streetAddress();
        let companyAddressState = faker.address.state();

        // insert entries into database
        insertCompanies(companyName, companySuffix, suffix, catchPhrase, companyImage, companyAddressStreet, companyAddressState)
            .then(res => {
                console.log('company data added to database');
            })
            .catch(err => {
                console.log(`Error adding company data to database: ${err}`);
            });
    }
};

// truncate tables before seeding
truncateTables('api_limiter.companies')
    .then(() => {

        // ==== run seed functions ====

        //company data
        seedCompany();
    })
    .catch(err => {
        console.log(`Error seeding database: ${err}`);
    });
