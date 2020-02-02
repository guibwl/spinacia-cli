#!/usr/bin/env node

var os = require('os');
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
    cliDirName = typeof name === "string" ? name : "my-app";
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
  "start": "spinacia-script start",
  "build": "spinacia-script build",
  "test": "spinacia-script test"
};

newPackageJson.eslintConfig = {
  "extends": "@spinacia/eslint-config-app"
};

newPackageJson.dependencies = {
  "@babel/polyfill": "^7.8.3",
  "@loadable/component": "^5.12.0",
  "@spinacia/script": `^${packageJson.version}`,
  "antd-mobile": "^2.3.1",
  "history": "^4.10.1",
  "ost-ui": "^0.0.7",
  "prop-types": "^15.7.2",
  "react": "^16.12.0",
  "react-dom": "^16.12.0",
  "react-redux": "^5.0.7",
  "react-route": "^1.0.3",
  "react-router": "^4.3.1",
  "react-router-dom": "^4.3.1",
  "redux": "^4.0.0",
  "redux-thunk": "^2.3.0",
  "typescript": "^3.7.5"
};


if (program.scriptsVersion) {
  if (program.scriptsVersion.match(/^.+\.(tgz|tar\.gz)$/)) {
    newPackageJson.dependencies["@spinacia/script"] = `file:${program.scriptsVersion}`;
  } else if (program.scriptsVersion.match(/^file:/)) {
    newPackageJson.dependencies["@spinacia/script"] = program.scriptsVersion;
  } else if (program.scriptsVersion.match(/^\d+\.\d+\.\d/)) {
    newPackageJson.dependencies["@spinacia/script"] = program.scriptsVersion;
  } else {
    console.log("--scripts-version error!");
    process.exit(1);
  }
}



const packagePath = path.join(installPath, "package.json");

fs.ensureFileSync(packagePath);

fs.writeFileSync(packagePath, JSON.stringify(newPackageJson, null, 2) + os.EOL);


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