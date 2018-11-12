#!/usr/bin/env node

var fs = require("fs-extra");
var path = require('path');
var chalk = require('chalk')
var ora = require('ora');
var program = require('commander');

var proPath = process.cwd(); //project path
var _cwd = path.resolve(__dirname, '../');
var packageJson = require('../package.json');

var cliDirName;
var appDirName;

program
  .version(packageJson.version)
  .option('-p, --pure', 'install')
  .option('-r, --redux', 'install')
  .option('-m, --mobx', 'install')
  .action(function (name) {

    cliDirName = typeof name === 'string' ? name : null;
  })
  .parse(process.argv);

if (program.redux) {
  appDirName = 'spinacia-react-redux';
} else {
  appDirName = 'spinacia-react-redux';
}

if (program.pure) {
  appDirName = 'spinacia-react-pure';
}

if (program.mobx) {
  appDirName = 'spinacia-react-mobx';
}


var originDir = path.join(_cwd, `/packages/template/${appDirName}`);
var install_path = path.join(proPath + '/' + (cliDirName || appDirName));
var spinner = ora().start();

spinner.color = 'yellow';
spinner.text = appDirName + chalk.bold.blue(' installing');

// Rename gitignore after the fact to prevent npm from renaming it to .npmignore
// See: https://github.com/npm/npm/issues/1862
try {
  fs.moveSync(
    path.join(originDir, 'gitignore'),
    path.join(originDir, '.gitignore'),
    []
  );
} catch (err) {
  // Append if there's already a `.gitignore` file there
  if (err.code === 'EEXIST') {
    const data = fs.readFileSync(path.join(originDir, 'gitignore'));
    fs.appendFileSync(path.join(originDir, '.gitignore'), data);
    fs.unlinkSync(path.join(originDir, 'gitignore'));
  } else {
    throw err;
  }
}

// Async with promises:
fs.copy(originDir, install_path)
  .then(() => {
    setTimeout(() => {

      spinner.info('');
      spinner.succeed([appDirName + chalk.bold.green(' has installed')])
    }, 1500);
  })
  .catch(err => console.error(err))