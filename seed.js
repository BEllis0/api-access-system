const faker = require('faker');
const { insertCompanies, insertProducts } = require('./server/models/seedFunctions.js');
const { truncateTables } = require('./server/models/truncateTables.js');

// number of entries to add to db
const numOfEntries = 100;

// companies data
const seedCompanies = () => {
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
                console.log('Company data added to database');
            })
            .catch(err => {
                console.log(`Error adding company data to database: ${err}`);
            });
    }
};

const seedProducts = () => {
    for (let i = 0; i < numOfEntries; i++) {
        // data categories
        let productName = faker.commerce.productName();
        let department = faker.commerce.department();
        let productImage = faker.image.technics();
        let color = faker.commerce.color();
        let productMaterial = faker.commerce.productMaterial();
        let productAdj = faker.commerce.productAdjective();
        let price = Number(faker.commerce.price());

        console.log(productMaterial, productAdj, department)

        insertProducts(productName, department, productImage, color, productMaterial, productAdj, price)
            .then(res => {
                console.log('Product added to database');
            })
            .catch(err => {
                console.log(`Error adding product data to database: ${err}`);
            });
    }
};

// truncate tables before seeding
truncateTables('api_limiter.companies', 'api_limiter.products')
    .then(() => {
        // ==== run seed functions ====
        //company data
        seedCompanies();
        //product data
        seedProducts();
    })
    .catch(err => {
        console.log(`Error seeding database: ${err}`);
    });
