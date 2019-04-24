// this env does not match process.env.NODE_ENV
// this is match process.env.BUILD_ENV

module.exports = {
  eslint: true,
  // when use `npm start` will get part of this config
  // when use `npm run build` will get part of this config
  dev: {
    // same as document.title
    documentTitle: '',
    // only working on local service
    port: 3000,
    // ignore on local service
    // after build all assets files assetsPublicPath
    // when publicPath did not set, `assetsPublicPath` will not working
    // example, in `https://dev.origin/my-app/webapp/index.html` this url, `/my-app/webapp/` is your assetsPublicPath
    assetsPublicPath: '',
    // ignore on local service
    // after build all assets files publicPath, it will be relative path when this is empty
    // example, in `https://dev.origin/my-app/webapp/index.html` this url, `https://dev.origin` is your publicPath
    publicPath: '',
    // this is for fetch(...), get by `process.env.ORIGIN_ENV` in you code
    origin: 'https://dev.origin',
    // build output directory name
    outputDir: 'dist'
  },
  // when use `npm run build:prod` will get this config
  prod: {
    // same as document.title
    documentTitle: '',
    // after build all assets files assetsPublicPath
    // when publicPath did not set, `assetsPublicPath` will not working
    // example, in `https://prod.origin/my-app/webapp/index.html` this url, `/my-app/webapp/` is your assetsPublicPath
    assetsPublicPath: '',
    // after build all assets files publicPath, it will be relative path when this is empty
    // example, in `https://prod.origin/my-app/webapp/index.html` this url, `https://prod.origin` is your publicPath
    publicPath: '/Users/liuyuan076/workspace-private/spinacia-cli/packages/template/spinacia-react-redux/dist',
    // this is for fetch(...), get by `process.env.ORIGIN_ENV` in you code
    origin: 'https://prod.origin',
    // output directory name
    outputDir: 'dist'
  }
}
