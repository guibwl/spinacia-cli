const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    app: path.join(basePath, './build')
  },
  output: {
    path: path.resolve(basePath, './dist'),
    chunkFilename: 'static/js/[name].[chunkhash:12].js',
    filename: '[name].[chunkhash:12].js'
  },
  optimization: {
    splitChunks: {
        chunks: "all",
        cacheGroups: {
            vendor: {
                name: "vendors",
                chunks: "all",
                test: /react|redux|core-js/,
                priority: 10,
                enforce: true
            },
            dependencies: {
                name: "dependencies",
                chunks: "all",
                test: /^((?!react|redux|core-js).)*node_modules((?!react|redux|core-js).)*$/,
                priority: 10,
                enforce: true
            },
            commons: {
                name: 'commons',
                chunks: "all",
                test: /app\//,
                priority: 10,
                enforce: true
            }
        }
    },
    runtimeChunk: { name: 'manifest' }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'static/css/[name].[chunkhash:12].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: path.join(basePath, 'favicon.ico')
    })
  ].concat(process.env.TRAVIS_CI ? [] : [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]),
  resolve: {
    extensions: ['.js', '.jsx']
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', "postcss-loader"]
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',  'less-loader', "postcss-loader"]
        })
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=static/media/[name].[hash:12].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader?name=static/media/[name].[hash:12].[ext]&limit=25000'
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  }
};
