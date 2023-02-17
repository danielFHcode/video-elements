const babel = require('@babel/core');
const paths = require('./paths');

module.exports = function (code, { min = false, esModule = false } = {}) {
    const output = babel.transformSync(code, {
        presets: [
            [
                '@babel/env',
                {
                    targets: '<0.25%',
                    modules: esModule ? false : 'umd',
                },
            ],
        ],
        filename: 'video-elements.js',
        minified: min,
    });
    const textOutput = output.code;
    return textOutput;
};
