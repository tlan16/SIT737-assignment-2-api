const Vision = require('node-cloud-vision-api')
const crc = require('crc')
const fs = require('fs')
const {setCache, getFromCache} = require('../helpers')

const {vision: Config} = require('../configurations/google')
const cacheTtsSeconds = 60 // 1 min

Vision.init(Config)

const labelAnalysis = (filePath, callback) => {
  const maxResult = 10

  const cacheKey = {
    fileHash: crc.crc32(fs.readFileSync(filePath, 'utf8')).toString(16),
    maxResult,
    method: `${__dirname} ${__filename} labelAnalysis`,
  }

  getFromCache(cacheKey, jsonString => {
    if (jsonString && callback instanceof Function)
      callback(JSON.parse(jsonString))
    else {
      const visionRequest = new Vision.Request(Object.assign({
        image: new Vision.Image(filePath),
        features: [
          new Vision.Feature('LABEL_DETECTION', maxResult),
        ],
      }))

      Vision.annotate(visionRequest).then(({responses: {0: {labelAnnotations = []}}}) => {
        if (callback instanceof Function) callback(labelAnnotations)
        setCache(cacheKey, JSON.stringify(labelAnnotations), cacheTtsSeconds)
      })
    }
  })
}

module.exports = {
  labelAnalysis,
}