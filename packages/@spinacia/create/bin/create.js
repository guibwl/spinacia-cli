#!/usr/bin/env node

var fs = require("fs-extra");
var path = require('path');
var chalk = require('chalk')
var spawn = require('cross-spawn');
var ora = require('ora');
var program = require('commander');
var inquirer = require('inquirer');

var processPath = fs.realpathSync(process.cwd()); //project path
var _cwd = path.resolve(__dirname, "../");
var packageJson = require('../package.json');

var cliDirName;

program
  .version(packageJson.version)
  .action(function(name) {
    cliDirName = typeof name === "string" ? name : "spinacia-react-app";
  })
  .option(
    "--scripts-version <alternative-package>",
    "use a non-standard version of @spinacia/script"
  )
  .parse(process.argv);


var templatePath = path.join(_cwd, "template");
var installPath = path.join(processPath, cliDirName);

// loading pluging start...
var spinner = ora().start();
spinner.color = 'yellow';
spinner.text = cliDirName + chalk.bold.blue(' installing');

// Create package.json ...
const newPackageJson = {};

newPackageJson.name = cliDirName;

newPackageJson.scripts = {
  "start": "spc-script start",
  "build": "spc-script build",
  "test": "spc-script test"
};

newPackageJson.eslintConfig = {
  "extends": "@spinacia/eslint-config-app"
};

newPackageJson.dependencies = {
  "@babel/polyfill": "^7.4.4",
  "@loadable/component": "^5.10.2",
  "@spinacia/script": "1.0.0",
  "antd-mobile": "^2.2.2",
  "history": "^4.7.2",
  "ost-ui": "^0.0.7",
  "prop-types": "^15.6.2",
  "react": "^16.4.1",
  "react-dom": "^16.4.1",
  "react-redux": "^5.0.7",
  "react-route": "^1.0.3",
  "react-router": "^4.3.1",
  "react-router-dom": "^4.3.1",
  "redux": "^4.0.0",
  "redux-thunk": "^2.3.0"
};

if (program.scriptsVersion.match(/^.+\.(tgz|tar\.gz)$/)) {
  newPackageJson.dependencies["@spinacia/script"] = `file:${program.scriptsVersion}`;
} else if (program.scriptsVersion.match(/^file:/)) {
  newPackageJson.dependencies["@spinacia/script"] = program.scriptsVersion;
} else if (program.scriptsVersion.match(/^\d+\.\d+\.\d/)) {
  newPackageJson.dependencies["@spinacia/script"] = program.scriptsVersion;
} else if (program.scriptsVersion) {
  console.log("--scripts-version error!");
  process.exit(1);
}
console.log('newPackageJson >>>', newPackageJson);


const packagePath = path.join(installPath, "package.json");

fs.ensureFileSync(packagePath);

fs.writeFileSync(packagePath, JSON.stringify(newPackageJson, null, 2));


// Async with promises:
fs.copy(templatePath, installPath)
  .then(() => {
    setTimeout(() => {


      // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
      // See: https://github.com/npm/npm/issues/1862
      try {
        fs.moveSync(
          path.join(installPath, 'gitignore'),
          path.join(installPath, '.gitignore'),
          []
        );
      } catch (err) {
        // Append if there's already a `.gitignore` file there
        if (err.code === 'EEXIST') {
          const data = fs.readFileSync(path.join(installPath, 'gitignore'));
          fs.appendFileSync(path.join(installPath, '.gitignore'), data);
          fs.unlinkSync(path.join(installPath, 'gitignore'));
        } else {
          throw err;
        }
      }

      spinner.info('');
      spinner.succeed([cliDirName + chalk.bold.green(' has installed')])

      // install dependencies
       inquirer
        .prompt([{
            type: 'confirm',
            name: 'installDependencies',
            message: 'want install dependencies?'
        }])
        .then(answers => {
                const {installDependencies} = answers;

                if (installDependencies) {
                  spawn.sync('npm', ['install'], { stdio: 'inherit', cwd: installPath });
                }
        });
      
    }, 1500);
  })
  .catch(err => console.error(err))