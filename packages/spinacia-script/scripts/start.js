const spawn = require('cross-spawn');

spawn.sync(
    'node',
    ['server.js'],
    { stdio: 'inherit' }
);
