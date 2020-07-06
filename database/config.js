const { Pool, Client } = require('pg');

const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: 'api_limiter',
  password: process.env.DB_PASS,
  port: '5432',
};

module.exports.dbConnection = new Pool(config);

module.exports.dbConnection.connect((err) => {
    if (err) {
        console.log(`Error connecting to db: ${err}`);
    } else {
        console.log('Successfully connected to database');
    }
});

// handle errors in idle clients
module.exports.dbConnection.on('error', (err, client) => {
    if (err) {
        console.log(`Error in idle client: ${err}`);
    }
});

module.exports.dbConnection.on('acquire', (client) => {
    console.log('Client checked out from the pool')
});

module.exports.dbConnection.on('remove', (client) => {
    console.log('Client closed and removed');
});