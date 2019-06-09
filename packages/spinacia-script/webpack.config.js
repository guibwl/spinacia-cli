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
const postcssNormalize = require('postcss-normalize');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackBar = require('webpackbar');
const getCacheIdentifier = require('./utils/getCacheIdentifier');

const paths = require('./path');

const {ENV_CONF, ESLINT} = require('./path');

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
    ],
    'sourceMap': false
  },
};


module.exports = {
  'devtool': 'source-map',
  // Stop compilation early in production
  'bail': true,
  'entry': {
    'app': paths.appIndexJs
  },
  'output': {
    'path': paths.appOutputDir,
    'chunkFilename': 'static/js/[name].[contenthash:8].chunk.js',
    'filename': 'static/js/[name].[contenthash:8].js',
    'publicPath': paths.publicPath,
    'devtoolModuleFilenameTemplate': info => path
      .relative(paths.appSrc, info.absoluteResourcePath)
      .replace(/\\/g, '/')
  },
  'externals': {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-thunk': 'ReactThunk'
  },
  'recordsPath': paths.records,
  'optimization': {
    'minimize': true,
    'splitChunks': {
      'chunks': 'all',
    },
    'runtimeChunk': true,
    'minimizer': [
      new TerserJSPlugin({
        'terserOptions': {
          'parse': {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            'ecma': 8,
          },
          'compress': {
            'ecma': 5,
            'warnings': false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            'comparisons': false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            'inline': 2,
          },
          'mangle': {
            'safari10': true,
          },
          'output': {
            'ecma': 5,
            'comments': false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            'ascii_only': true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        'parallel': true,
        // Enable file caching
        'cache': true,
        'sourceMap': true
      }),
      new OptimizeCssAssetsPlugin({
        'cssProcessorOptions': {
          'parser': safePostCssParser,
          'map': {
            // 不生成内联映射,这样配置就会生成一个source-map文件
            'inline': false,
            // 向css文件添加source-map路径注释
            // 如果没有此项压缩后的css会去除source-map路径注释
            'annotation': true
          }
        }
      })
    ]
  },
  'plugins': [
    new WebpackBar({
      'name': '[SPINACIA][BUILD]',
      'profile': false,
      'basic': false
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      'filename': 'static/css/[name].[contenthash:8].css'
    }),
    new HtmlWebpackPlugin(Object.assign(
      {
        'title': typeof ENV_CONF.documentTitle === 'string' ? ENV_CONF.documentTitle : 'spinacia-react-redux',
        'template': paths.appHtml,
        'inject': true,
        'favicon': paths.favicon,
        'minify': {
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
        },
        'loading': {
          'html': fs.readFileSync(paths.loadingHtml),
          'css': `<style>${fs.readFileSync(paths.loadingCss)}</style>`
        }
      },
      paths.assetsCdn,
      paths.assetsLib
    )),
    new CleanWebpackPlugin(),
    new WebpackAssetsManifest({
      'output': 'build-assets.json',
      publicPath(filename) {
        return `${paths.publicPath}${filename}`;
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ].concat(process.env.TRAVIS_CI ? [] : [
    new webpack.DefinePlugin({'process.env.ORIGIN_ENV': JSON.stringify(ENV_CONF.origin)}),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]),
  'resolve': {
    'extensions': ['.js', '.jsx'],
    'plugins': [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin
    ]
  },
  'resolveLoader': {
    'plugins': [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module),
    ]
  },
  'module': {
    'rules': [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      ESLINT && typeof ESLINT === 'boolean' ? {
        'test': /\.(js|mjs|jsx|ts|tsx)$/,
        'enforce': 'pre',
        'use': [
          {
            'options': {
              'formatter': require('eslint-friendly-formatter'),
              'eslintPath': require.resolve('eslint'),
              // @remove-on-eject-begin
              'baseConfig': {
                'extends': [require.resolve('eslint-config-spinacia-app')],
              },
              'ignore': false,
              'useEslintrc': false,
              // @remove-on-eject-end
              'fix': true
            },
            'loader': require.resolve('eslint-loader'),
          },
        ],
        'include': [paths.appSrc, paths.appBuild]
      } : {},
      {
        'test': /\.(js|mjs|jsx|ts|tsx)?$/,
        'loader': 'babel-loader',
        'include': [paths.appSrc, paths.appBuild],
        'options': {
          'customize': require.resolve('./babel/webpack-overrides.js'),
          'babelrc': false,
          'compact': false,
          'presets': [require.resolve('./babel/preset.js')],
          // Make sure we have a unique cache identifier, erring on the
          // side of caution.
          // We remove this when the user ejects because the default
          // is sane and uses Babel options. Instead of options, we use
          // the react-scripts and babel-preset-react-app versions.
          'cacheIdentifier': getCacheIdentifier(
            'production',
            [
              'babel-plugin-named-asset-import',
              'spinacia-script',
            ]
          ),
          'plugins': [
            [
              require.resolve('babel-plugin-import'),
              {
                'libraryName': 'antd-mobile',
                'style': 'css'
              }
            ],
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                'loaderMap': {
                  'svg': {
                    'ReactComponent': '@svgr/webpack?-svgo,+ref![path]',
                  },
                },
              },
            ],
          ],
          'cacheDirectory': true
        }
      },
      {
        'test': /\.(le|c)ss$/,
        'use': [
          {
            'loader': MiniCssExtractPlugin.loader,
            'options': {
              // only enable hot in development
              'hmr': process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              'reloadAll': true,
              'publicPath': '../../'
            }
          },
          'css-loader',
          postcssOption,
          'less-loader'
        ]
      },
      {
        'test': /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        'loader': 'file-loader',
        'options': {
          'name': '[name].[contenthash:8].[ext]',
          'outputPath': 'static/media/',
          'publicPath': paths.appMedia
        }
      },
      {
        'test': /\.(jpe?g|png|gif)(\?.+)?$/,
        'loader': 'url-loader',
        'options': {
          'limit': 10000,
          'name': '[name].[contenthash:8].[ext]',
          'outputPath': 'static/media/',
          'publicPath': paths.appMedia
        }
      },
      {
        'test': /\.md$/,
        'loader': 'raw-loader'
      }
    ]
  },
  'performance': {
    'hints': 'warning',
    'maxEntrypointSize': 250000,
    'maxAssetSize': 250000
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  'node': {
    'module': 'empty',
    'dgram': 'empty',
    'dns': 'mock',
    'fs': 'empty',
    'http2': 'empty',
    'net': 'empty',
    'tls': 'empty',
    'child_process': 'empty',
  },
  'stats': {
    'all': false,
    'colors': true,
    'assets': true,
    'assetsSort': 'size',
    'builtAt': true,
    'cached': true,
    'env': true,
    'modules': true,
    'maxModules': 0,
    'performance': true,
    'publicPath': true,
    'version': true,
    'errors': true,
    'warnings': true,
    // our additional options
    'moduleTrace': true,
    'errorDetails': true
  }
};
