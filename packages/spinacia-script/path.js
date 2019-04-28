const fs = require('fs');
const path = require('path');

const isSourceEnv = __dirname.indexOf(path.join('packages', 'spinacia-script')) !== -1;

// app root context dir path
const basePath = isSourceEnv
  ? path.join(__dirname, '../template/spinacia-react-redux/')
  : process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../../')
    : fs.realpathSync(process.cwd());


// assets source path
const assetsFile = require(path.join(basePath, 'build/assets'));
const assets = process.env.BUILD_ENV === 'prod'
  ? assetsFile.prod
  : assetsFile.dev;


// client env.config
const ENVCONFFILE = require(path.join(basePath, 'build/env.config'));
const ENV_CONF = process.env.BUILD_ENV === 'prod'
  ? ENVCONFFILE.prod
  : ENVCONFFILE.dev;

// client eslint switch
const ESLINT = ENVCONFFILE.eslint;

// works on process.env.NODE_ENV === 'production'
const _publicPath = (function () {
  let _path = '';
  
  if (ENV_CONF.publicPath && ENV_CONF.assetsPublicPath) {
  
    _path = path.join(ENV_CONF.publicPath, ENV_CONF.assetsPublicPath);
  } else if (ENV_CONF.publicPath && !ENV_CONF.assetsPublicPath) {
  
    _path = ENV_CONF.publicPath;
  }
  
  return _path;
})();