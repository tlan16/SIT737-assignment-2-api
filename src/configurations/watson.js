require('dotenv').config()

const base = {
  username: process.env.WATSON_TTS_USERNAME,
  password: process.env.WATSON_TTS_PASSWORD,
}

const tts = {
  ...base,
  url: 'https://stream.watsonplatform.net/text-to-speech/api/',
}

module.exports = {
  tts,
}