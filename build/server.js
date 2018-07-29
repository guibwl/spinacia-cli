/* eslint import/no-extraneous-dependencies: ['off'] */

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');

new WebpackDevServer(webpack({
  mode: 'development',
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: '../favicon.ico'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, './'),
          path.join(__dirname, '../app')
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
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
}).listen(3000, error => {
  if (error) {
    throw error;
  }
});
