const { Pool, Client } = require('pg');

var connectionString = "postgres://postgres:Skiclub0@localhost:5432/api_limiter";
const client = new Client({
    connectionString: connectionString
});

client.connect((err) => {
    err ? console.log(`Error connecting to db: ${err}`) : console.log('Successfully connected to database')
});

// const pool = new Pool({
//     user: 'localhost',
//     host: process.env.HOST,
//     database: process.env.DB,
//     password: process.env.DB_PASS,
//     port: process.env.PORT,
// });

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// });

// const client = new Client({
//   user: 'localhost',
//   host: process.env.HOST,
//   database: process.env.DB,
//   password: process.env.DB_PASS,
//   port: process.env.PORT,
// });

// client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// });