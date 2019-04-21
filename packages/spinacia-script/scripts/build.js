const spawn = require('cross-spawn');

spawn.sync(
    'npm',
    ['run', 'build'],
    { stdio: 'inherit' }
);
