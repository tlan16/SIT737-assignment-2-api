const service = require('../services/translation')

const translate = app => {
  app.get('/api/translate/:text', (req, res) => {
    service.get(req.params.text, req.query.language, ({translatedText}) => {
      res.send(translatedText)
    })
  })
}

module.exports = app => {
  translate(app)
}
