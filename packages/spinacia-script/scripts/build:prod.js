const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');

const basePath = path.join(__dirname, '../');

spawn.sync(
    'npm',
    ['run', 'build:prod'],
    { stdio: 'inherit', cwd: basePath}
);
