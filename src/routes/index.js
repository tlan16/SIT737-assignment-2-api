const Vision = require('./label')
const Translate = require('./translate')
const Tts = require('./tts')

module.exports = app => {
    Vision(app)
    Translate(app)
    Tts(app)
}