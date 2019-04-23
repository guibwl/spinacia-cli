/* eslint import/no-extraneous-dependencies: ["off"] */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const WebpackBar = require('webpackbar');

const basePath = __dirname.indexOf(path.join('packages', 'spinacia-script')) !== -1
  ? path.join(__dirname, '../template/spinacia-react-redux/')
  : fs.realpathSync(process.cwd());

const assets = require(path.join(basePath, 'build/assets'));
const ENV_CONF = require(path.join(basePath, 'build/env.config')).dev;

const PORT = ENV_CONF.port || 3000;

const postcssOption = {
  // Options for PostCSS as we reference these options twice
  // Adds vendor prefixing based on your specified browser support in
  // package.json
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebook/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      // Adds PostCSS Normalize as the reset css with default options,
      // so that it honors browserslist config in package.json
      // which in turn let's users customize the target behavior as per their needs.
      postcssNormalize(),
    ],
    sourceMap: false
  },
}

new WebpackDevServer(webpack({
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    path.join(basePath, 'build/index.js')
  ],
  output: {
    publicPath:'./',
    filename: 'bundle.js'
  },
  plugins: [
    new WebpackBar({
      name: '[SPINACIA]',
      profile: false,
      basic: false
    }),
    new webpack.DefinePlugin({ 'process.env.ORIGIN_ENV': JSON.stringify(ENV_CONF.origin) }),
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(Object.assign(
      {
        title: typeof ENV_CONF.documentTitle === 'string' ? ENV_CONF.documentTitle : 'spinacia-react-redux',
        template: path.join(basePath, 'build/index.html'),
        inject: true,
        favicon: path.join(basePath, 'favicon.ico'),
        loading: {
          html: fs.readFileSync(path.join(path.join(basePath, './build'), assets.dev.loading.html)),
          css: '<style>' + fs.readFileSync(path.join(path.join(basePath, './build'), assets.dev.loading.css)) + '</style>'
        }
      },
      assets.dev.cdn,
      assets.dev.lib
    )),
    new OpenBrowserPlugin({ url: `http://localhost:${PORT}` })
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
    strictExportPresence: true,
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require("eslint-friendly-formatter"),
              eslintPath: require.resolve('eslint'),
              // @remove-on-eject-begin
              baseConfig: {
                extends: [require.resolve('eslint-config-spinacia-app')],
              },
              ignore: false,
              useEslintrc: false,
              // @remove-on-eject-end
              fix: true
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: [path.join(basePath, 'app'), path.join(basePath, 'build')]
      },
      {
        test: /\.(js|jsx)?$/,
        loader: require.resolve('babel-loader'),
        include: [
          path.join(basePath, './app'),
          path.join(basePath, './build')
        ],
        options: {
          babelrc: false,
          // configFile: false,
          compact: false,
          presets: [
            [
              require.resolve('babel-preset-env'),
              {
                'targets': {
                  'uglify': true,
                  'browsers': [
                    'last 2 versions',
                    'Firefox ESR',
                    '> 1%',
                    'ie >= 8',
                    'iOS >= 8',
                    'Android >= 4'
                  ]
                },
                'modules': false,
                'loose': true,
                'useBuiltIns': true,
                'debug': true
              }
            ],
            [require.resolve('babel-preset-react')],
            [require.resolve('babel-preset-stage-1')]
          ],
          plugins: [
            [
              require.resolve('babel-plugin-import'),
              {
                'libraryName': 'antd-mobile',
                'style': 'css'
              }
            ],
            [
              require.resolve('babel-plugin-transform-runtime'),
              {
                'polyfill': false
              }
            ]
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', postcssOption]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', postcssOption, 'less-loader']
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