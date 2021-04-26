// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
   path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
   // Environment variables
   NODE_ENV: process.env.NODE_ENV,
   // Environment variables
   DB_HOST: process.env.DB_HOST,
   DB_USER: process.env.DB_USER,
   DB_PASSWORD: process.env.DB_PASSWORD,
   DB_NAME: process.env.DB_NAME
  }