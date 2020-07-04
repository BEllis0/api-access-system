const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const dbConnection = require('../database/config.js');

// env vars config
require('dotenv').config();

// ==== route imports


// express app
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// ==== serve files ====
// app.use('/', express.static(path.join(__dirname, '')));

// ======================
// ===== middleware =====
// ======================

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// ================
// ==== Routes ====
// ================


// start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});