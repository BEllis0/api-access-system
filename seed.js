const  faker = require('faker');

// number of entries to add to db
const numOfEntries = 20;

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

        // db model


        console.log({
            companyName: companyName,
            suffix: suffix,
            companySuffix: companySuffix,
            catchPhrase: catchPhrase,
            companyImage: companyImage,
            companyAddressStreet: companyAddressStreet,
            companyAddressState: companyAddressState
        });
    }
}