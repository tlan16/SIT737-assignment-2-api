const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const Routes = require('./routes/index')

require('dotenv').config()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use(session({
  secret: 'some-secret',
  resave: true,
  saveUninitialized: true,
}))

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200)
  }
  else {
    //move on
    next()
  }
})

app.options("/*", function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

const routes = app => {
  app.get('/api/', (req, res) => {
    res.send(['Hello', 'API'])
  })

  Routes(app)
}

routes(app)

app.listen(process.env.PORT)
console.log(`Listening on port ${process.env.PORT}...`)
