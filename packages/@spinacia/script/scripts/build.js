process.env.NODE_ENV = 'production';


const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('@spinacia/utils/serviceConfig/webpackConfig');
const clearConsole = require('@spinacia/utils/clearConsole');


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


compiler.run((err, stats) => {

  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  console.log(stats.toString({
    'all': false,
    'colors': true,
    'assets': true,
    'assetsSort': 'size',
    'builtAt': true,
    'cached': true,
    'env': true,
    'modules': true,
    'maxModules': 0,
    'performance': true,
    'publicPath': true,
    'version': true,
    'errors': true,
    'warnings': true,
    // our additional options
    'moduleTrace': true,
    'errorDetails': true
  }))

});
