const express = require('express');
const api = require('./api/index');
const app = require('./app/index');

require('dotenv').config();

const application = express();
const bodyParser = require('body-parser')
application.use(bodyParser.json())
application.use(bodyParser.urlencoded({
    extended: true
}));

api(application);
app(application);

application.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
