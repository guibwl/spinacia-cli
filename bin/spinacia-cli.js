#!/usr/bin/env node

var fs=require("fs-extra");
var path = require('path');
var chalk = require('chalk')
var ora = require('ora');

var proPath = process.cwd(); //project path
var _cwd = path.resolve(__dirname, '../');

if(process.argv.includes('--pure')) {

    var originDir = path.join(_cwd, '/packages/template/spinacia-react-pure');
    var args = process.argv.slice(2);
    var install_path = path.join(proPath+'/' + (args[1] || 'spinacia-react-pure'));
    var spinner = ora().start();

    spinner.color = 'yellow';
    spinner.text = 'spinacia-react-pure' + chalk.bold.blue(' installing');

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
            spinner.succeed(['spinacia-react-pure' + chalk.bold.green(' has installed')])
        }, 1500);
      })
      .catch(err => console.error(err))

} else {

  var originDir = path.join(_cwd, '/packages/template/spinacia-react-redux');
  var args = process.argv.slice(2);
  var install_path = path.join(proPath+'/' + (args[0] || 'spinacia-react-redux'));
  var spinner = ora().start();

  spinner.color = 'yellow';
  spinner.text = 'spinacia-react-redux' + chalk.bold.blue(' installing');

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
          spinner.succeed(['spinacia-react-redux' + chalk.bold.green(' has installed')])
      }, 1500);
    })
    .catch(err => console.error(err))
}

