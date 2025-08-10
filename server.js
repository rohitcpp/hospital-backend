require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();

// Middleware
app.use(express.json());

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//not the final code