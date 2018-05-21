const watson = require('watson-developer-cloud/text-to-speech/v1')
const {tts: watsonConfig} = require('../configurations/watson')
const {setCache, getFromCache} = require('../helpers')

const Tts = new watson(watsonConfig)

const tts = (q, target, callback) => {
  Tts.synthesize(
    {
      text: q,
      voice: target,
      accept: 'audio/wav',
    },
    (err, audio) => {
      Tts.repairWavHeader(audio)
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
  tts,
  voices,
}