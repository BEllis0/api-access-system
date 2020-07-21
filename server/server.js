const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const dbConnection = require('../database/config.js');

// env vars config
require('dotenv').config();

// ==== route imports
const productRoutes = require('./routes/products.js');
const companiesRoutes = require('./routes/companies.js');
const userRoutes = require('./routes/users.js');
// const loginRoutes = require('./routes/login.js');

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

app.use('/api/v1/companies', companiesRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/users', userRoutes);

// ============
// start server
// ============

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});