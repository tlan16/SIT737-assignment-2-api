require('dotenv').config()

const defaultTtsSeconds = 3600 // 1 hour

const config = {
  host: process.env.REDIS_HOST,
}

module.exports = {
  config,
  defaultTtsSeconds,
}