const path = require('path');
const paths = require('./paths');

const assetsConfigFile = require(paths.assetsConfigFile);

// 将 url 转为 <script src="..." ></script> 之类的字符串
const assetsLibsToStr = (libs) => {

  if (!libs) {
    throw new Error('assets config can\'t be empty!');
  }

  const obj = {
    'js': null,
    'css': null
  };

  if (libs.js && libs.js.length) {
    obj.js = libs.js.map(el =>
        `'<script src="${el}"><\\/script>'`
    )
    .join('\n+');
  }

  if (libs.css && libs.css.length) {
    obj.css = libs.css.map(el =>
        `'<link href="${el}" rel="stylesheet">'`
    )
    .join('\n+');
  }

  return obj;
};


module.exports = {
  'loadingHtml': path.join(paths.appBuild, assetsConfigFile.loading.html),
  'loadingCss': path.join(paths.appBuild, assetsConfigFile.loading.css),
  'assetsDevLibs': assetsLibsToStr(assetsConfigFile.dev.libs),
  'assetsProdLibs': assetsLibsToStr(assetsConfigFile.prod.libs),
  'devPattern': assetsConfigFile.devPattern
}


