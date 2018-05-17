const Helpers = require('../helpers')

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

const service = (q, target, callback) => {
    const translate = require('../services/translation');

    translate.get(q, target, translations => {
        translations = translate.extract(translations);
        callback(translations);
    });
};

const translate = app => {
    app.post('/api/vision/label/translate', Helpers.getPostData().single('image'), (req, res) => {
        const filePath = req.file.path;

        vision(filePath, labels => {
            service(labels, 'de', translations => {
                res.send(translations);
            });
        });
    });
}

module.exports = app => {
    translate(app)
}
