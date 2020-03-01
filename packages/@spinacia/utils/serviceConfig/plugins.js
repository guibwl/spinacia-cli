

const fs = require('fs');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
      'preset': (() => {

        const makeupInScript = str => `<script>(function(){${str}})()</script>`;

        const condition = `/test|localhost|^\\d+\\.\\d+\\.\\d+\\.\\d+$/i.test(window.location.hostname)`;

        const devAssets = [assetsDevLibs.css, assetsDevLibs.js].filter(Boolean).join('\n+') || `null`;

        const prodAssets = [assetsProdLibs.css, assetsProdLibs.js].filter(Boolean).join('\n+') || `null`;
        
        return makeupInScript(
          `var assets;if(${condition}){assets=${devAssets};}else{assets=${prodAssets};};assets&&document.writeln(assets);`
        );
      })()
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

  new webpack.DefinePlugin({
    'node_argvs': JSON.stringify(nodeArgvs)
  }),
  isEnvProduction && new webpack.HashedModuleIdsPlugin(),
  isEnvProduction && new CopyPlugin([
    {
      'from': paths.appAssets,
      'to': paths.appOutputDir,
      'ignore': [
        '**/index.html',
        '**/build-assets.json',
        '**/favicon.ico',
        '**/static/**'
      ]
    }
  ])
].filter(Boolean);

module.exports = {plugins};
