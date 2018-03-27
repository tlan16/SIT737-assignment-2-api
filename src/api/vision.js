module.exports = (req, res) => {
    const vision = require('node-cloud-vision-api');
    const maxResult = 10;

    vision.init({auth: process.env.GOOGLE_API_KEY});

    const visionRequest = new vision.Request({
        image: new vision.Image(req.file.path),
        features: [
            new vision.Feature('LABEL_DETECTION', maxResult),
        ]
    });

    vision.annotate(visionRequest).then(visionResponse => {
        res.send(visionResponse.responses);
    }, e => {
        let msg = process.env.mode === 'production' ? 'Unexpected error. Please contact your system administrator.' : `Google vision api error: ${e}`;
        res.status(500).send(msg);
    })
};