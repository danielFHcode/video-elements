const build = require('./index');
const paths = require('./paths');
const fs = require('fs');

fs.watch(paths.inputDir, () => build());
