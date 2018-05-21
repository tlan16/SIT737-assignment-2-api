const watson = require('watson-developer-cloud/text-to-speech/v1')
const {tts: watsonConfig} = require('../configurations/watson')
const {defaultTtsSeconds: cacheTtsSeconds} = require('../configurations/redis')
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
      if (callback instanceof Function) callback(audio)
    }
  )
}

const voices = (callback) => {
  const cacheKey = {
    ...watsonConfig,
    method: `${__dirname} ${__filename} get_voice_list`,
  }

  getFromCache(cacheKey, jsonString => {
    if (jsonString && callback instanceof Function)
      callback(JSON.parse(jsonString))
    else {
      Tts.listVoices({}, (err, data) => {
        if (callback instanceof Function) callback(data)
        setCache(cacheKey, JSON.stringify(data), cacheTtsSeconds)
      })
    }
  })
}

module.exports = {
  tts,
  voices,
}