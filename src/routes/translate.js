const {translate: Translate} = require('../services/translation')

const translate = app => {
  app.get('/api/translate/:text', (req, res) => {
    Translate(req.params.text, req.query.source || 'en', req.query.language, ({translatedText}) =>
      res.send(translatedText)
    )
  })
}

module.exports = app => {
  translate(app)
}
