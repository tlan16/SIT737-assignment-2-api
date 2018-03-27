const express = require('express');

const api = require('./api/index');
const app = require('./app/index');
require('dotenv').config();

const application = express();

api(application);
app(application);

application.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
