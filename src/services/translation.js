const Translator = require('google-translate')(process.env.GOOGLE_API_KEY)

const Translate = Translator.translate

const translate = (q, source, target, callback) => {
  if (q instanceof String && q.length) q = [q]

  Translate(q, source, target, (err, translations) => {
    if (callback instanceof Function) callback(translations)
  })
}

module.exports = {
  translate,
}