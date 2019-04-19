const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const assets = require('./assets');

const basePath = path.resolve(__dirname, '../');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.join(basePath, './build')
  },
  output: {
    path: path.resolve(basePath, './dist'),
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    filename: '[name].[contenthash:8].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-thunk': 'ReactThunk'
  },
  recordsPath: path.join(basePath, 'records.json'),
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
    runtimeChunk: { name: 'manifest' },
    minimizer: [
      new TerserJSPlugin({
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            // 不生成内联映射,这样配置就会生成一个source-map文件
            inline: false,
            // 向css文件添加source-map路径注释
            // 如果没有此项压缩后的css会去除source-map路径注释
            annotation: true
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css'
    }),
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
      assets.prod.cdn
    )),
    new CleanWebpackPlugin()
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
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
              publicPath: (resourcePath, context) => {
                
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/';
              }
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=static/media/[name].[contenthash:8].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader?name=static/media/[name].[contenthash:8].[ext]&limit=8000'
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  }
};
