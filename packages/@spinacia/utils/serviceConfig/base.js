const fs = require('fs');
const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

// paths info
const paths = require('../paths');
const appPackageJson = require(paths.appPackageJson);

// appConfig by user
const appConfig = require('../appConfig');

// the node env
const webpackEnv = process.env.NODE_ENV;
const isEnvDevelopment = webpackEnv === 'development';
const isEnvProduction = webpackEnv === 'production';


module.exports = {
  mode: webpackEnv,
  // Stop compilation early in production
  bail: isEnvProduction,
  devtool: isEnvDevelopment ? 'cheap-module-source-map' : isEnvProduction && 'source-map',
  entry: [ paths.appIndexJs ],
  output: {
    path: isEnvProduction ? appConfig.outputDir : undefined,
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isEnvProduction
    ? 'static/js/[name].[contenthash:8].chunk.js'
    : isEnvDevelopment && 'static/js/[name].chunk.js',
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'static/js/bundle.js',
    // We inferred the "public path" (such as / or /my-project) from appConfig.
    // We use "/" in development.
    publicPath: isEnvProduction ? appConfig.publicPath : '/',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isEnvProduction
      ? info =>
          path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/')
      : isEnvDevelopment &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    // Prevents conflicts when multiple Webpack runtimes (from different apps)
    // are used on the same page.
    jsonpFunction: `webpackJsonp${appPackageJson.name}`,
  },
  externals: isEnvProduction ? {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-thunk': 'ReactThunk'
  } : {},
  recordsPath: isEnvProduction ? paths.records : undefined,
  resolve: {
    'extensions': ['.js', '.jsx'],
    'plugins': [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin
    ],
    alias: {'@appSrc': paths.appSrc}
  },
  'resolveLoader': {
    'plugins': [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module),
    ]
  },
  'performance': isEnvProduction ? {
    'hints': 'warning',
    'maxEntrypointSize': 250000,
    'maxAssetSize': 250000
  } : false,
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  'node': {
    'module': 'empty',
    'dgram': 'empty',
    'dns': 'mock',
    'fs': 'empty',
    'http2': 'empty',
    'net': 'empty',
    'tls': 'empty',
    'child_process': 'empty',
  },
  'stats': {
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
  }
};
