const Helpers = require('../../helpers')

const translate = (q, target, callback) => {
    const translate = require('../services/translation');

    translate.get(q, target, translations => {
        translations = translate.extract(translations);
        callback(translations);
    });
};

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
    const tts = require('../services/testToSpeech');

    tts.get(q, target, callback);
};

const tts = app => {
    app.post('/api/vision/label/tts', Helpers.getPostData().single('image'), (req, res) => {
        const filePath = req.file.path;
        let target = 'de'; //TODO: translate google language naming to watson naming

        vision(filePath, labels => {
            translate(labels, target, translations => {
                console.log(translations[0]);
                target = 'de-DE_BirgitVoice'; //TODO: translate google language naming to watson naming
                service(translations[0], target, speech => {
                    res.header('Content-Type', 'audio/wav');
                    res.send(speech);
                });
            });
        });
    });
}

module.exports = app => {
    tts(app)
}
