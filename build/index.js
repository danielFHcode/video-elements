const rollup = require('./rollup');
const babel = require('./babel');
const paths = require('./paths');
const fs = require('fs');

module.exports = async function () {
    const rollupText = await rollup();
    const babelText = babel(rollupText);
    const babelMinText = babel(rollupText, { min: true });
    const babelEsModuleText = babel(rollupText, { esModule: true });
    fs.writeFileSync(paths.output, babelText);
    fs.writeFileSync(paths.minOutput, babelMinText);
    fs.writeFileSync(paths.esModuleOutput, babelEsModuleText);
};

module.exports();
