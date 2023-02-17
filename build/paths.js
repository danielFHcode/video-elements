const path = require('path');

module.exports = {
    input: path.join(__dirname, '../src/script.js'),
    inputDir: path.join(__dirname, '../src/'),
    output: path.join(__dirname, '../dist/video-elements.js'),
    minOutput: path.join(__dirname, '../dist/video-elements.min.js'),
    esModuleOutput: path.join(__dirname, '../dist/video-elements.module.js'),
};
