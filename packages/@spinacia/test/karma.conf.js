// Karma configuration
// Generated on Mon Aug 12 2019 10:06:39 GMT+0800 (CST)

const loaders = require('@spinacia/utils/serviceConfig/loaders');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: './entry.js', watched: false },
    ],


    // list of files / patterns to exclude
    exclude: ['node_modules'],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './entry.js': ['babel', 'webpack']
    },

    babelPreprocessor: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],


    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: `${process.cwd()}/coverage/istanbul`,

      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // Omit files with no statements, no functions and no branches from the report
      skipFilesWithNoCoverage: true,

      'report-config': {
        html: { subdir: 'html' },
        lcovonly: { subdir: 'lcov' }
      }
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_without_security'], // You may use 'ChromeCanary', 'Chromium' or any other supported browser

    // you can define custom flags
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    webpack: {
      mode: 'none',
      module: loaders.module,
      plugins: [
        new ProgressBarWebpackPlugin({
          format: chalk.green('[SPINACIA][TEST] [:bar] ') + 'building (:percent)',
          complete: '*',
          clear: false
        })
      ]
    },
    plugins: [
      'karma-webpack',
      'karma-chai',
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-babel-preprocessor',
      'karma-mocha-reporter',
      'karma-coverage-istanbul-reporter'
    ],
  })
}
