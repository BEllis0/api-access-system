const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'localhost',
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.DB_PASS,
    port: process.env.PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
});

const client = new Client({
  user: 'localhost',
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: process.env.PORT,
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
});