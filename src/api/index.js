module.exports = app => {
    const multer = require('multer');
    const upload = multer({dest: '/tmp/'});
    const vision = require('./vision');

    app.get('/api/', (req, res) => {
        res.send(['Hello', 'API']);
    });

    app.post('/api/vision/label', upload.single('image'), vision);
};