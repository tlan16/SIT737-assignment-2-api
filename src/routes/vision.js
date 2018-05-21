const helpers = require('../helpers')
const {labelAnalysis: Vision} = require('../services/vision')

const vision = app => {
  app.post('/api/vision/label', helpers.getPostData().single('image'), (req, res) => {
    Vision(req.file.path, labelAnnotations =>
      res.send(labelAnnotations)
    )
  })
}

module.exports = app => {
  vision(app)
}
