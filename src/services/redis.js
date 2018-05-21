const Redis = require('redis')
require('dotenv').config()

const client = Redis.createClient({
  host: process.env.REDIS_HOST,
})
const {promisify} = require('util')

const getAsync = promisify(client.get).bind(client)

console.log({
  host: process.env.REDIS_HOST,
})

client.on("error", err => {
  console.error("Redis error " + err)
})

module.exports = {
  client,
  getAsync,
}