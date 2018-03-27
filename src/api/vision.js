module.exports = (filePath, callback = ()=>{}) => {
    const vision = require('node-cloud-vision-api');
    const maxResult = 10;

    vision.init({auth: process.env.GOOGLE_API_KEY});

    const visionRequest = new vision.Request({
        image: new vision.Image(filePath),
        features: [
            new vision.Feature('LABEL_DETECTION', maxResult),
        ]
    });

    vision.annotate(visionRequest).then(callback);
};