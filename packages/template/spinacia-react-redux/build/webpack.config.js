const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = path.resolve(__dirname, '../');

module.exports = {
  devtool: 'source-map',
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
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/].+(react|redux)/,
          priority: 3,
          enforce: true
        },
        dependencies: {
          name: 'dependencies',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          enforce: true
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          test: module => {
            const filePath = module.nameForCondition && module.nameForCondition();
            const rgx = new RegExp(`${basePath}/app/(index.jsx|components|config|css|utils)`);

            if (rgx.test(filePath)) {
              return true;
            }
            return false;
          },
          priority: 1,
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
      favicon: path.join(basePath, 'favicon.ico'),
      loading: {
        html: fs.readFileSync(path.join(__dirname, './loading/loading.html')),
        css: '<style>' + fs.readFileSync(path.join(__dirname, './loading/loading.css')) + '</style>'
      }
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
          use: [ 'css-loader', 'postcss-loader'],
          publicPath: '../../'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader',  'less-loader'],
          publicPath: '../../'
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
