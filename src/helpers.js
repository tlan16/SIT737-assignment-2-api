const multer = require('multer')
const {crc32} = require('crc')
const {client: Redis, getAsync: CacheGetter} = require('./services/redis')

const getPostData = () => {
  return multer({dest: '/tmp/'})
}

const hashCacheKey = key => {
  if (key instanceof Array || key instanceof Object) {
    try {
      key = JSON.stringify(key)
    } catch (e) {
      // ignore
    }

    key = crc32(key).toString(16)
  }

  return key
}

const setCache = (key, value, ttsSeconds = 0) => {
  key = hashCacheKey(key)
  if (ttsSeconds > 0)
    Redis.set(key, value, 'EX', ttsSeconds)
  else Redis.set(key, value)
}

const getFromCache = (key, callback) => {
  key = hashCacheKey(key)
  CacheGetter(key)
    .then(res => {
      if (callback instanceof Function)
        callback(res)
    })
}

module.exports = {
  getPostData,
  setCache,
  getFromCache,
}