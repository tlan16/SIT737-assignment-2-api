const tts = app => {
  app.get('/api/tts/translate/:text', (req, res) => {
    const Tts = require('../services/testToSpeech')
    Tts.translate(req.params.text, req.query.voice, speech => {
      res.header('Content-Type', 'audio/wav')
      res.send(speech)
    })
  })

  app.get('/api/tts/voices', (req, res) => {
    const Tts = require('../services/testToSpeech')
    Tts.voices(({voices}) => {
      res.send(voices.reduce((acc, voice) => {
        acc[voice.name] = voice
        return acc
      }, {}))
    })
  })
}

module.exports = app => {
  tts(app)
}
