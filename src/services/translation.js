const {defaultTtsSeconds: cacheTtsSeconds} = require('../configurations/redis')
const {setCache, getFromCache} = require('../helpers')

const Translator = require('google-translate')(process.env.GOOGLE_API_KEY)
const Translate = Translator.translate

const translate = (q, source, target, callback) => {
  if (q instanceof String && q.length) q = [q]

  const cacheKey = {
    q,
    source,
    target,
    method: `${__dirname} ${__filename} translate`,
  }

  getFromCache(cacheKey, jsonString => {
    if (jsonString && callback instanceof Function)
      callback(JSON.parse(jsonString))
    else {
      Translate(q, source, target, (err, translations) => {
        if (callback instanceof Function) callback(translations)
        setCache(cacheKey, JSON.stringify(translations), cacheTtsSeconds)
      })
    }
  })
}

module.exports = {
  translate,
}