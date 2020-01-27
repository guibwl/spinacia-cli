

const fs = require('fs');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../paths');

const {
  documentTitle,
  publicPath,
} = require('../appConfig');

const {
  loadingHtml,
  loadingCss,
  assetsDevLibs,
  assetsProdLibs
} = require('../appAssets');

const {
    nodeArgvs
} = require('../appArgvs');

// the node env
const webpackEnv = process.env.NODE_ENV;
const isEnvDevelopment = webpackEnv === 'development';
const isEnvProduction = webpackEnv === 'production';

const webpackbarName = isEnvProduction ? 'BUILD' : isEnvDevelopment && 'DEV';

const plugins = [
  new WebpackBar({
    'name': `[SPINACIA][${webpackbarName}]`,
    'profile': false,
    'basic': false
  }),
  new CaseSensitivePathsPlugin(),
  isEnvProduction && new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  isEnvProduction && new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    'filename': 'static/css/[name].[contenthash:8].css'
  }),
  new HtmlWebpackPlugin(
    {
      'title': typeof documentTitle === 'string' ? documentTitle : 'spinacia-react-redux',
      'template': paths.appHtml,
      'inject': true,
      'favicon': paths.favicon,
      'minify': isEnvProduction ? {
        'removeComments': true,
        'collapseWhitespace': true,
        'removeRedundantAttributes': true,
        'useShortDoctype': true,
        'removeEmptyAttributes': true,
        'removeStyleLinkTypeAttributes': true,
        'keepClosingSlash': true,
        'minifyJS': true,
        'minifyCSS': true,
        'minifyURLs': true
      } : undefined,
      'loading': {
        'html': fs.readFileSync(loadingHtml),
        'css': `<style>${fs.readFileSync(loadingCss)}</style>`
      },
      'preset':
          `<script>` +
          `var scriptStr = /test|localhost|^\\d+\\.\\d+\\.\\d+\\.\\d+$/i.test(window.location.hostname)?` +
          [assetsDevLibs.css, assetsDevLibs.js].filter(Boolean).join('\n+') +
          `:` +
          [assetsProdLibs.css, assetsProdLibs.js].filter(Boolean).join('\n+') +
          `;` +
          `scriptStr && document.writeln(scriptStr)` +
          `</script>`
    }
  ),
  isEnvProduction && new CleanWebpackPlugin(),
  isEnvProduction && new WebpackAssetsManifest({
    'output': 'build-assets.json',
    publicPath(filename) {
      const assetsPath = paths.splicePublicPathFn(publicPath, filename);

      if (assetsPath) {
        return assetsPath;
      } else {
        return filename;
      }
    }
  }),
  //申明浏览器环境常量
  new webpack.DefinePlugin({
    'node_argvs': JSON.stringify(nodeArgvs)
  }),
  isEnvProduction && new webpack.HashedModuleIdsPlugin()
].filter(Boolean);

module.exports = {plugins};