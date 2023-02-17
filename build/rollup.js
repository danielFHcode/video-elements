const rollup = require('rollup');
const paths = require('./paths');

module.exports = async function () {
    const rollupOutput = await rollup.rollup({
        input: paths.input,
    });
    const textOutput = await rollupOutput.generate({});
    return textOutput.output[0].code;
};
