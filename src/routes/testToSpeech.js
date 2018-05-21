const {tts: Tts, voices: Voices} = require('../services/testToSpeech')

const testToSpeech = app => {
  app.get('/api/text-to-speech/speak/:text', (req, res) => {
    Tts(req.params.text, req.query.voice, speech =>
      res.header('Content-Type', 'audio/wav')
        .send(speech)
    )
  })

  app.get('/api/text-to-speech/voices', (req, res) => {
    Voices(({voices}) => {
      res.send(voices.reduce((acc, voice) => {
        acc[voice.name] = voice
        return acc
      }, {}))
    })
  })
}

module.exports = app => {
  testToSpeech(app)
}
