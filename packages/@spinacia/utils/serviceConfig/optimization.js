const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');


// the node env
const webpackEnv = process.env.NODE_ENV;
const isEnvProduction = webpackEnv === 'production';

const optimization = {
  'minimize': isEnvProduction,
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
}

module.exports = {optimization};