const Vision = require('node-cloud-vision-api')
const {vision: Config} = require('../configurations/google')

Vision.init(Config)

const labelAnalysis = (filePath, callback) => {
  const maxResult = 10

  const visionRequest = new Vision.Request(Object.assign({
    image: new Vision.Image(filePath),
    features: [
      new Vision.Feature('LABEL_DETECTION', maxResult),
    ],
  }))

  Vision.annotate(visionRequest).then(({responses: {0: {labelAnnotations = []}}}) => {
    if (callback instanceof Function) callback(labelAnnotations)
  })
}

module.exports = {
  labelAnalysis,
}