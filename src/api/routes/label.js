const helpers = require('../../helpers')

const vision = (filePath, callback) => {
    const vision = require('../services/vision');
    vision.get(filePath, labelAnnotations => {
        labelAnnotations = vision.filter(labelAnnotations, process.env.VISON_SCORE_THRESHOLD);
        labelAnnotations = vision.extract(labelAnnotations);
        callback(labelAnnotations);
    }, e => {
        throw e
    });
};

const analysis = app => {
    app.post('/api/vision/label', helpers.getPostData().single('image'), (req, res) => {
        const filePath = req.file.path;

        vision(filePath, labels => {
            res.send(labels);
        });
    });
}

module.exports = app => {
    analysis(app)
}
