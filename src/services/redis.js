const Redis = require('redis')
const Config = require('../configurations/redis')

const client = Redis.createClient(Config)
const getAsync = require('util').promisify(client.get).bind(client)

client.on("error", err =>
  console.error("Redis error " + err)
)

module.exports = {
  client,
  getAsync,
}