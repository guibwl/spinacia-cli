process.env.NODE_ENV = 'development';


const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('@spinacia/utils/serviceConfig/webpackConfig');
const devServer = require('@spinacia/utils/serviceConfig/devServer');
const clearConsole = require('@spinacia/utils/clearConsole');
const {port} = require('@spinacia/utils/appConfig');
const detectPort = require('@spinacia/utils/detectPort');

const HOST = process.env.HOST || '0.0.0.0';

detectPort(port, HOST)
  .then(_port => {

    const isInteractive = process.stdout.isTTY;

    // "Compiler" is a low-level interface to Webpack.
    // It lets us listen to some events and provide our own custom messages.
    let compiler;
    try {
      compiler = webpack(webpackConfig);
    } catch (err) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      console.log(err.message || err);
      console.log();
      process.exit(1);
    }

    // "invalid" event fires when you have changed a file, and Webpack is
    // recompiling a bundle. WebpackDevServer takes care to pause serving the
    // bundle, so if you refresh, it'll wait instead of serving the old one.
    // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
    compiler.hooks.invalid.tap('invalid', () => {
      if (isInteractive) {
        clearConsole();
      }
      console.log('Compiling...');
    });


    const startDevServer = new WebpackDevServer(compiler, devServer);

    // Launch WebpackDevServer.
    startDevServer.listen(_port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      
      if (isInteractive) {
        clearConsole();
      }

      console.log(chalk.cyan('Starting the development server...\n'));
    });

  })

