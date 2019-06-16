#!/usr/bin/env node

const fs = require("fs-extra");
const path = require('path');
const chalk = require('chalk')
const ora = require('ora');
const commander = require('commander');
const envinfo = require('envinfo');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');

const createPkgJson = require('./createPkgJson');

// project path
const cwd = process.cwd(); 

// spinacia-cli path
const cliPath = path.resolve(__dirname, '../');

// get packageJson
const packageJson = require('../package.json');

// customizeDirName set by user
let customizeDirName;

let scriptsVersion;

// default appDirName is 'spinacia-react-redux'
let appDirName = 'spinacia-react-redux';

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(function (name) {

    customizeDirName = typeof name === 'string' ? name : null;
  })
  .option('-p, --pure', 'install')
  .option('-r, --redux', 'install with redux')
  .option('-m, --mobx', 'install with mobx')
  .option('--info', 'print environment debug info')
  .option(
    '--scripts-version <alternative-package>',
    'use a non-standard version of spinacia-script'
  )
  .allowUnknownOption()
  .parse(process.argv);


if (program.info) {
  console.log(chalk.bold('\nEnvironment Info:'));
  return envinfo
    .run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'npm', 'Yarn'],
        Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
        npmPackages: ['react', 'react-dom', 'react-scripts'],
        npmGlobalPackages: ['create-react-app'],
      },
      {
        duplicates: true,
        showNotFound: true,
      }
    )
    .then(console.log);
}


if (program.redux) {
  appDirName = 'spinacia-react-redux';
}

if (program.pure) {
  appDirName = 'spinacia-react-pure';
}

if (program.mobx) {
  appDirName = 'spinacia-react-mobx';
}

if (program.scriptsVersion.match(/^.+\.(tgz|tar\.gz)$/)) {
  scriptsVersion = `file:${program.scriptsVersion}`;
}

// start loading in terminal
const spinner = ora().start();
// install loding...
spinner.color = 'yellow';
spinner.text = appDirName + chalk.bold.blue(' installing');


// template directory path
const templateDir = path.join(cliPath, `/template/${appDirName}`);
// user install app path
// if user set `customizeDirName`, then install to customize path
const installDir = path.join(cwd + '/' + (customizeDirName || appDirName));


// copy template to user install path
fs.copy(templateDir, installDir)
  .then(async () => {

    await createPkgJson(templateDir, installDir, scriptsVersion);
    createGitignore(installDir);

    // clean spinner loading...
    spinner.info('');
    spinner.succeed([appDirName + chalk.bold.green(' has installed')])

    inquirerNpmInstall(installDir);
  })
  .catch(err => {
    
    console.error(err)
    process.exit(1);
  })



function createGitignore(instalDir) {
    // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
    // See: https://github.com/npm/npm/issues/1862
    try {
      fs.moveSync(
        path.join(instalDir, 'gitignore'),
        path.join(instalDir, '.gitignore'),
        []
      );
    } catch (err) {
      // Append if there's already a `.gitignore` file there
      if (err.code === 'EEXIST') {
        const data = fs.readFileSync(path.join(instalDir, 'gitignore'));
        fs.appendFileSync(path.join(instalDir, '.gitignore'), data);
        fs.unlinkSync(path.join(instalDir, 'gitignore'));
      } else {
        throw err;
      }
    }
}

function inquirerNpmInstall (installDir) {

  return inquirer
        .prompt({
          type: 'confirm',
          name: 'autoNpmInstall',
          message: 'Do you want `npm install` for your app?',
          default: false,
        })
        .then(answer => {
          if (answer.autoNpmInstall) {

            console.log('Installing packages. This might take a couple of minutes.');

            const installSpawn = spawn(
              'npm',
              [
                'install',
                '--loglevel',
                'error'
              ],
              { 
                stdio: 'inherit',
                cwd: installDir
              }
            )

            installSpawn.on('close', code => {
              if (code !== 0) {
                process.exit(1);
              }
              
              console.log('Done!');

            });

          } else {
            process.exit(0);
          }
        });

}