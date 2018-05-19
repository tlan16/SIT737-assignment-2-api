const get = (q, target, callback) => {
  const translator = require('google-translate')(process.env.GOOGLE_API_KEY)

  if (q instanceof String && q.length) q = [q]

  translator.translate(q, 'en', target, (err, translations) => {
    console.log(translations)
    if (callback instanceof Function) callback(translations)
  })
}

const extract = (translations = []) => {
  const extract = ({translatedText}) => {
    return translatedText
  }

  return translations.map(extract)
}

module.exports = {
  get,
  extract,
}