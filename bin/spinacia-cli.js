#!/usr/bin/env node

var args = process.argv.slice(2);
var path = require('path');
var spawn = require('child_process').spawn;
var proPath = process.cwd(); //project path
var install_path = path.resolve(proPath+'/' + (args[0] || 'spinacia-react-app'));
var delFiles = require('../utils/deleteFiles');


var instalInstance = spawn('git clone', ['https://github.com/guibwl/spinacia-react-redux.git', '--template=', install_path], {
    stdio: 'inherit',
    env: process.env,
    shell: true
})

instalInstance.on('close', () => {
    delFiles(install_path + '/.git')
})

instalInstance.on('error', function (err) {
    console.error(err.stack || err)
})