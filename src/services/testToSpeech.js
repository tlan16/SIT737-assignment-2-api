const watson = require('watson-developer-cloud/text-to-speech/v1')
const {setCache, getFromCache} = require('../helpers')

const watsonConfig = {
  username: process.env.WATSON_TTS_USERNAME,
  password: process.env.WATSON_TTS_PASSWORD,
  url: 'https://stream.watsonplatform.net/text-to-speech/api/',
}

const tts = new watson(watsonConfig)

const translate = (q, target, callback) => {
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

const voices = (callback) => {
  const cacheKey = {
    ...watsonConfig,
    method: 'get_voice_list',
  }
  const cacheTtsSeconds = 3600

  getFromCache(cacheKey, jsonString => {
    if (jsonString)
      callback(JSON.parse(jsonString))
    else {
      tts.listVoices({}, (err, data) => {
        setCache(cacheKey, JSON.stringify(data), cacheTtsSeconds)
        callback(data)
      })
    }
  })
}

module.exports = {
  translate,
  voices,
}