const path = require('path');
const spawn = require('cross-spawn');

const basePath = path.join(__dirname, '../');

spawn.sync(
    'node',
    [path.join(basePath, 'server.js')],
    { stdio: 'inherit'}
);
