const { Pool, Client } = require('pg');

// const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DB}`;

// const client = new Client({
//     connectionString: connectionString
// });

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: 'api_limiter',
  password: process.env.DB_PASS,
  port: '5432',
});

client.connect((err) => {
    if (err) {
        console.log(`Error connecting to db: ${err}`);
    } else {
        console.log('Successfully connected to database');
    }
});

// const pool = new Pool({
//     user: 'localhost',
//     host: process.env.HOST,
//     database: process.env.DB,
//     password: process.env.DB_PASS,
//     port: process.env.PORT,
// });

// client.connect();