module.exports = app => {
    const multer = require('multer');
    const upload = multer({dest: '/tmp/'});

    app.get('/api/', (req, res) => {
        res.send(['Hello', 'API']);
    });

    app.post('/api/vision/label', upload.single('image'), (req, res) => {
        const vision = require('node-cloud-vision-api');
        const maxResult = 10;

        vision.init({auth: process.env.GOOGLE_API_KEY});

        const vreq = new vision.Request({
            image: new vision.Image(req.file.path),
            features: [
                new vision.Feature('LABEL_DETECTION', maxResult),
            ]
        });

        // send single request
        vision.annotate(vreq).then((vres) => {
            // handling response
            console.log(JSON.stringify(vres.responses));
            res.send(vres.responses);
        }, (e) => {
            console.log('Error: ', e)
        })
    });
};