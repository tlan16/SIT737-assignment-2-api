const express = require('express');

const app = require('./routes');
require('dotenv').config();

const application = express();

app(application);

application.listen(process.env.PORT);
console.log(`Listening on port ${process.env.APP_PORT}...`);
