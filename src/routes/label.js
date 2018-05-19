const helpers = require('../helpers')
const vision = require('../services/vision');

const analysis = app => {
    app.post('/api/vision/label', helpers.getPostData().single('image'), (req, res) => {
        const filePath = req.file.path;
        vision.get(filePath, labelAnnotations => {
            res.send(labelAnnotations);
        });
    });
}

module.exports = app => {
    analysis(app)
}
