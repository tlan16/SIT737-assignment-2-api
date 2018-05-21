require('dotenv').config()

const base = {
  auth: process.env.GOOGLE_API_KEY,
}

module.exports = {
  vision: base,
}