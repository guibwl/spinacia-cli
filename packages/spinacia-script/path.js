const fs = require('fs');
const path = require('path');
const url = require('url');

const isSourceEnv = __dirname.indexOf(path.join('packages', 'spinacia-script')) !== -1;

// app root context dir path
const basePath = () => {
  
  if (isSourceEnv) {

    return path.resolve(__dirname, '../template/spinacia-react-redux/');

  } else if (process.env.NODE_ENV === 'production') {

    return path.resolve(__dirname, '../../');

  } else {

    return fs.realpathSync(process.cwd());

  }
}

const resolveApp = relativePath => path.resolve(basePath(), relativePath);


// assets source path
const assetsFile = require(resolveApp('build/assets'));

const assets = () => process.env.BUILD_ENV === 'prod'
  ? assetsFile.prod
  : assetsFile.dev;


// client env.config
const ENVCONFFILE = require(resolveApp('build/env.config'));

const ENV_CONF = () => process.env.BUILD_ENV === 'prod'
  ? ENVCONFFILE.prod
  : ENVCONFFILE.dev;

// client eslint switch
const ESLINT = () => ENVCONFFILE.eslint;

// works on process.env.NODE_ENV === 'production'
const publicPath = () => {

  const conf = ENV_CONF();
  let _path = '';

  if (conf.publicPath && conf.assetsPublicPath) {

    _path = url.resolve(conf.publicPath, conf.assetsPublicPath);

  } else if (conf.publicPath && !conf.assetsPublicPath) {

    _path = conf.publicPath;

  }

  return url.parse(_path);
};


const getServedPath = relativePath => publicPath().href 
    ? url.resolve(publicPath().href, path.join(publicPath().pathname, relativePath)) 
    : '';


module.exports = {
  appIndexJs: resolveApp('build/index.js'),
  appOutputDir: resolveApp(ENV_CONF().outputDir || 'dist'),
  appHtml: resolveApp('build/index.html'),
  appSrc: resolveApp('app'),
  appBuild: resolveApp('build'),
  appMedia: getServedPath('/static/media/'),
  records: resolveApp('records.json'),
  favicon: resolveApp('favicon.ico'),
  loadingHtml: path.join(resolveApp('build'), assets().loading.html),
  loadingCss: path.join(resolveApp('build'), assets().loading.css),
  assetsCdn: assets().cdn,
  assetsLib: assets().lib,
  publicPath: publicPath().href,
  ENV_CONF: ENV_CONF(),
  ESLINT: ESLINT()
}