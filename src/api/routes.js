const vision = (filePath, callback) => {
    const vision = require('./vision');
    vision.get(filePath, labelAnnotations => {
        labelAnnotations = vision.filter(labelAnnotations, process.env.VISON_SCORE_THRESHOLD);
        labelAnnotations = vision.extract(labelAnnotations);
        callback(labelAnnotations);
    }, e => {
        throw e
    });
};

const translate = (q, target, callback) => {
    const translate = require('./translation');

    translate.get(q, target, translations => {
        translations = translate.extract(translations);
        callback(translations);
    });
};

const tts = (q, target, callback) => {
    const tts = require('./services/testToSpeech');

    tts.get(q, target, callback);
};

module.exports = app => {
    const multer = require('multer');
    const upload = multer({dest: '/tmp/'});

    app.get('/api/', (req, res) => {
        res.send(['Hello', 'API']);
    });

    app.post('/api/vision/label', upload.single('image'), (req, res) => {
        const filePath = req.file.path;

        vision(filePath, labels => {
            res.send(labels);
        });
    });

    app.post('/api/vision/label/translate', upload.single('image'), (req, res) => {
        const filePath = req.file.path;

        vision(filePath, labels => {
            translate(labels, 'de', translations => {
                res.send(translations);
            });
        });
    });

    app.post('/api/vision/label/tts', upload.single('image'), (req, res) => {
        const filePath = req.file.path;
        let target = 'de'; //TODO: translate google language naming to watson naming

        vision(filePath, labels => {
            translate(labels, target, translations => {
                console.log(translations[0]);
                target = 'de-DE_BirgitVoice'; //TODO: translate google language naming to watson naming
                tts(translations[0], target, speech => {
                    res.header('Content-Type', 'audio/wav');
                    res.send(speech);
                });
            });
        });
    });
};