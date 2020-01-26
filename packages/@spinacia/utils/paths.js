const fs = require('fs');
const path = require('path');
const url = require('url');

// app root context dir path
const basePath = fs.realpathSync(process.cwd());

// App 路径拼装函数
const resolveApp = relativePath => path.resolve(basePath, relativePath);


const splicePublicPathFn = (publicPath, relativePath) => {
  const publicPathParsed = url.parse(publicPath);

  return  publicPathParsed.href
  ? url.resolve(
        publicPathParsed.href,
        path.join(publicPathParsed.pathname, relativePath)
    )
  : '';
}


module.exports = {
  appIndexJs: resolveApp('build/index.js'),
  appHtml: resolveApp('build/index.html'),
  appSrc: resolveApp('app'),
  appBuild: resolveApp('build'),
  records: resolveApp('records.json'),
  favicon: resolveApp('favicon.ico'),
  assetsConfigFile: resolveApp('build/assets'),
  envConfigFile: resolveApp('build/config'),
  appOutputDir: resolveApp('dist'),
  appPackageJson: resolveApp('package.json'),
  splicePublicPathFn: splicePublicPathFn
};
