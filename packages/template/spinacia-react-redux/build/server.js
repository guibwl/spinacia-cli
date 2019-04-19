/* eslint import/no-extraneous-dependencies: ["off"] */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const assets = require('./assets');

const basePath = path.resolve(__dirname, '../');
const PORT = 3000;

new WebpackDevServer(webpack({
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    publicPath:'./',
    filename: 'bundle.js'
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(Object.assign(
      {
        title: 'spinacia-react-redux',
        template: './index.html',
        inject: true,
        favicon: path.join(basePath, 'favicon.ico'),
        loading: {
          html: fs.readFileSync(path.join(path.join(basePath, './build'), assets.prod.loading.html)),
          css: '<style>' + fs.readFileSync(path.join(path.join(basePath, './build'), assets.prod.loading.css)) + '</style>'
        }
      },
      assets.dev.cdn
    ))
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    plugins: [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin
    ]
  },
  resolveLoader: {
    plugins: [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module),
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(basePath, './app'),
          path.join(basePath, './build')
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', "postcss-loader", 'less-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader : 'url-loader'
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  }
}), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(PORT, error => {
  if (error) {
    throw error;
  }
});
