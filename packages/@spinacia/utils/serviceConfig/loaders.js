const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');
const pxtorem = require('postcss-pxtorem');
const getCacheIdentifier = require('../getCacheIdentifier');

const webpackEnv = process.env.NODE_ENV;
const isEnvDevelopment = webpackEnv === 'development';
const isEnvProduction = webpackEnv === 'production';
const isEnvTest = webpackEnv === 'test';

const paths = require('../paths');

const appConfig = isEnvTest ? {} : require('../appConfig');
const {eslintEnable, eslintFix} = appConfig;


function checkPathExists() {

  return Array.prototype.filter.call(
    arguments,
    (p) => fs.existsSync(p)
  )
}

const postcssOption = {
    // Options for PostCSS as we reference these options twice
    // Adds vendor prefixing based on your specified browser support in
    // package.json
    'loader': require.resolve('postcss-loader'),
    'options': {
      // Necessary for external CSS imports to work
      // https://github.com/facebook/create-react-app/issues/2677
      'ident': 'postcss',
      'plugins': () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          'autoprefixer': {
            'flexbox': 'no-2009',
          },
          'stage': 3,
        }),
        // Adds PostCSS Normalize as the reset css with default options,
        // so that it honors browserslist config in package.json
        // which in turn let's users customize the target behavior as per their needs.
        postcssNormalize(),
        pxtorem({
          'rootValue': 50,
          'propWhiteList': []
        })
      ],
      'sourceMap': false
    },
};


const oneOf = [{
  'test': /\.(js|mjs|jsx|ts|tsx)?$/,
  'loader': 'babel-loader',
  'include': checkPathExists(paths.appSrc, paths.appBuild, `${process.cwd()}/src`),
  'options': {
    'customize': require.resolve('@spinacia/babel-preset-app/webpack-overrides.js'),
    'babelrc': false,
    'compact': false,
    'presets': [require.resolve('@spinacia/babel-preset-app')],
    // Make sure we have a unique cache identifier, erring on the
    // side of caution.
    // We remove this when the user ejects because the default
    // is sane and uses Babel options. Instead of options, we use
    // the react-scripts and babel-preset-react-app versions.
    'cacheIdentifier': getCacheIdentifier(
      isEnvProduction
        ? 'production'
        : isEnvDevelopment && 'development',
      [
        'babel-plugin-named-asset-import',
        '@spinacia/babel-preset-app',
        '@spinacia/utils',
        '@spinacia/script',
      ]
    ),
    'cacheDirectory': true
  }
},
{
  test: /\.(js|mjs)$/,
  exclude: /@babel(?:\/|\\{1,2})runtime/,
  loader: require.resolve('babel-loader'),
  options: {
    babelrc: false,
    configFile: false,
    compact: false,
    presets: [
      [
        require.resolve('@spinacia/babel-preset-app/dependencies'),
        { helpers: true },
      ],
    ],
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    // @remove-on-eject-begin
    cacheIdentifier: getCacheIdentifier(
      isEnvProduction
        ? 'production'
        : isEnvDevelopment && 'development',
      [
        'babel-plugin-named-asset-import',
        '@spinacia/babel-preset-app',
        '@spinacia/utils',
        '@spinacia/script',
      ]
    ),
    // @remove-on-eject-end
    // If an error happens in a package, it's possible to be
    // because it was compiled. Thus, we don't want the browser
    // debugger to show the original code. Instead, the code
    // being evaluated would be much more helpful.
    sourceMaps: false,
  },
},
{
    'test': /\.css$/,
    'use': [
      (isEnvDevelopment || isEnvTest) && require.resolve('style-loader'),
      isEnvProduction && {
          'loader': MiniCssExtractPlugin.loader,
          'options': { 'publicPath': '../../' }
      },
      'css-loader',
      postcssOption
    ].filter(Boolean)
},
{
  'test': /\.less$/,
  'use': [
    (isEnvDevelopment || isEnvTest) && require.resolve('style-loader'),
    isEnvProduction && {
        'loader': MiniCssExtractPlugin.loader,
        'options': { 'publicPath': '../../' }
    },
    'css-loader',
    postcssOption,
    'less-loader'
  ].filter(Boolean)
},
{
  'test': /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
  'loader': 'file-loader',
  'options': isEnvProduction ? {
    'name': '[name].[contenthash:8].[ext]',
    'outputPath': 'static/media/',
    'publicPath': appConfig.appMedia
  } : {}
},
{
  'test': /\.(jpe?g|png|gif)(\?.+)?$/,
  'loader': 'url-loader',
  'options': isEnvProduction ? {
    'limit': 10000,
    'name': '[name].[contenthash:8].[ext]',
    'outputPath': 'static/media/',
    'publicPath': appConfig.appMedia
  } : {}
}]


const loaders = {
  'rules': [
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    eslintEnable &&
    typeof eslintEnable === 'boolean' &&
    !isEnvTest ?
    {
      'test': /\.(js|mjs|jsx|ts|tsx)$/,
      'enforce': 'pre',
      'use': [
        {
          'options': {
            'formatter': require('eslint-friendly-formatter'),
            'eslintPath': require.resolve('eslint'),
            // @remove-on-eject-begin
            'baseConfig': {
              'extends': [require.resolve('@spinacia/eslint-config-app')],
            },
            'ignore': false,
            'useEslintrc': false,
            // @remove-on-eject-end
            'fix': eslintFix
          },
          'loader': require.resolve('eslint-loader'),
        },
      ],
      'include': [paths.appSrc, paths.appBuild]
    } :
    {},
    {oneOf} ,
    {
      'test': /\.md$/,
      'loader': 'raw-loader'
    }
  ]
};


module.exports = {module: loaders};
