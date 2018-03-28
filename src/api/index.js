module.exports = app => {
    const multer = require('multer');
    const upload = multer({dest: '/tmp/'});
    const vision = require('./vision');

    app.get('/api/', (req, res) => {
        res.send(['Hello', 'API']);
    });

    app.post('/api/vision/label', upload.single('image'), (req, res) => {
        const filePath = req.file.path;

        vision.get(filePath, labelAnnotations => {
            labelAnnotations = vision.filter(labelAnnotations, 0.96);
            labelAnnotations = vision.extract(labelAnnotations);
            res.send(labelAnnotations);
        }, e => {
            const msg = process.env.mode === 'production' ? 'Unexpected error. Please contact your system administrator.' : `Google vision api error: ${e}`;
            res.status(500).send(msg);
        });
    });
};