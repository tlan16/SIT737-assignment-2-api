module.exports = app => {
    const multer = require('multer');
    const upload = multer({dest: '/tmp/'});
    const vision = require('./vision');
    const translate = require('./translation');

    app.get('/api/', (req, res) => {
        res.send(['Hello', 'API']);
    });

    app.post('/api/vision/label', upload.single('image'), (req, res) => {
        const filePath = req.file.path;

        vision.get(filePath, labelAnnotations => {
            labelAnnotations = vision.filter(labelAnnotations, process.env.VISON_SCORE_THRESHOLD);
            labelAnnotations = vision.extract(labelAnnotations);
            res.send(labelAnnotations);
        }, e => {
            const msg = process.env.mode === 'production' ? 'Unexpected error. Please contact your system administrator.' : `Google vision api error: ${e}`;
            res.status(500).send(msg);
        });
    });

    app.post('/api/vision/label/translate', upload.single('image'), (req, res) => {
        const filePath = req.file.path;

        vision.get(filePath, labelAnnotations => {
            labelAnnotations = vision.filter(labelAnnotations, process.env.VISON_SCORE_THRESHOLD);
            labelAnnotations = vision.extract(labelAnnotations);

            translate.get(labelAnnotations, 'de', translations => {
                translations = translate.extract(translations);
                res.send(translations);
            });
        }, e => {
            const msg = process.env.mode === 'production' ? 'Unexpected error. Please contact your system administrator.' : `Google vision api error: ${e}`;
            res.status(500).send(msg);
        });
    });
};