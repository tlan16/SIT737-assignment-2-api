const express = require('express');

const api = require('./routes');
require('dotenv').config();

const application = express();

api(application);

application.listen(process.env.PORT);
console.log(`Listening on port ${process.env.API_PORT}...`);
