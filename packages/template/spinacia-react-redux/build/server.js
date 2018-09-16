/* eslint import/no-extraneous-dependencies: ["off"] */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: '../favicon.ico',
      loading: {
        html: fs.readFileSync(path.join(__dirname, './loading/loading.html')),
        css: '<style>' + fs.readFileSync(path.join(__dirname, './loading/loading.css')) + '</style>'
      }
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
