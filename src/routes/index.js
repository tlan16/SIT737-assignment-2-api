const Vision = require('./vision')
const Translate = require('./translate')
const Tts = require('./testToSpeech')

module.exports = app => {
  Vision(app)
  Translate(app)
  Tts(app)
}