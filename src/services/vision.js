const filter = (labelAnnotations = [], scopeThreshold = 0, topicalityThreshold = 0, sortBy = 'score') => {
  const filter = ({score, topicality}) => {
    return score > scopeThreshold && topicality > topicalityThreshold
  }

  const sort = (a, b) => {
    return b[sortBy] - a[sortBy]
  }

  labelAnnotations = labelAnnotations.filter(filter)
  if (sortBy.length) labelAnnotations = labelAnnotations.sort(sort)

  return labelAnnotations
}

const extract = (labelAnnotations = []) => {
  const extract = ({description}) => {
    return description
  }
  return labelAnnotations.map(extract)
}

const get = (filePath, callback, options = {}) => {
  const vision = require('node-cloud-vision-api')
  const maxResult = 10

  vision.init({auth: process.env.GOOGLE_API_KEY})

  const visionRequest = new vision.Request(Object.assign({
    image: new vision.Image(filePath),
    features: [
      new vision.Feature('LABEL_DETECTION', maxResult),
    ],
  }, options))

  vision.annotate(visionRequest).then(({responses: {0: {labelAnnotations = []}}}) => {
    if (callback instanceof Function) callback(labelAnnotations)
  })
}

module.exports = {
  get,
  filter,
  extract,
}