const path = require('path');
const url = require('url');
const paths = require('./paths');
const {envConfigFile, appOutputDir, splicePublicPathFn} = paths;

// client config
const config = require(envConfigFile);
const {
    port,
    eslint,
    documentTitle,
    publicPath,
    outputDir
} = config;



module.exports = {
  'port': port || 3000,
  'eslintEnable': eslint,
  'documentTitle': documentTitle,
  'publicPath': publicPath,
  'appMedia': splicePublicPathFn(publicPath, '/static/media/'),
  'outputDir': outputDir 
    ? appOutputDir.replace('dist', outputDir) 
    : appOutputDir
}