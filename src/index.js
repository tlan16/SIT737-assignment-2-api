const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes/index')

require('dotenv').config()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const routes = app => {
    app.get('/api/', (req, res) => {
        res.send(['Hello', 'API'])
    })

    Routes(app)
}

routes(app)

app.listen(process.env.PORT)
console.log(`Listening on port ${process.env.PORT}...`)
