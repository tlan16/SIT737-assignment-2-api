const watson = require('watson-developer-cloud/text-to-speech/v1')
const tts = new watson({
  username: process.env.WATSON_TTS_USERNAME,
  password: process.env.WATSON_TTS_PASSWORD,
  url: 'https://stream.watsonplatform.net/text-to-speech/api/',
})

const get = (q, target, callback) => {
  tts.synthesize(
    {
      text: q,
      voice: target,
      accept: 'audio/wav',
    },
    (err, audio) => {
      console.log(err)
      tts.repairWavHeader(audio)
      callback(audio)
    }
  )
}

module.exports = {
  get,
}