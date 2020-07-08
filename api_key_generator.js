const uuidAPIKey = require('uuid-apikey');

module.exports.generateApiKey = () => {
    return uuidAPIKey.create();
};