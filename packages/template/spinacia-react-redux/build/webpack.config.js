const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

const assets = require('./assets');
const ENV = require('./env.config');

const basePath = fs.realpathSync(process.cwd());
const ENV_CONF = process.env.BUILD_ENV === 'prod' ? ENV.prod : ENV.dev;

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.join(basePath, './build')
  },
  output: {
    path: path.resolve(basePath, './', ENV_CONF.outputDir || 'dist'),
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    filename: '[name].[contenthash:8].js',
    publicPath: ENV_CONF.publicPath || ''
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-thunk': 'ReactThunk'
  },
  recordsPath: path.join(basePath, 'records.json'),
  optimization: {
    minimize: true,
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
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
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
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new HtmlWebpackPlugin(Object.assign(
      {
        title: 'spinacia-react-redux',
        template: path.join(basePath, 'build/index.html'),
        inject: true,
        favicon: path.join(basePath, 'favicon.ico'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        loading: {
          html: fs.readFileSync(path.join(path.join(basePath, './build'), assets.prod.loading.html)),
          css: '<style>' + fs.readFileSync(path.join(path.join(basePath, './build'), assets.prod.loading.css)) + '</style>'
        }
      },
      assets.prod.cdn
    )),
    new CleanWebpackPlugin()
  ].concat(process.env.TRAVIS_CI ? [] : [
    new webpack.DefinePlugin({ 'process.env.ORIGIN_ENV': JSON.stringify(ENV_CONF.origin) }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]),
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
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
              publicPath: '../../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'static/media/',
          publicPath: ENV_CONF.publicPath ? path.join(ENV_CONF.publicPath, 'static/media/') : ''
        }
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'static/media/',
          publicPath: ENV_CONF.publicPath ? path.join(ENV_CONF.publicPath, 'static/media/') : ''
        }
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  }
};
