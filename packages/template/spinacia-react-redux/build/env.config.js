// this env does not match process.env.NODE_ENV
// this is match process.env.BUILD_ENV

module.exports = {
  // when use `npm start` will get part of this config
  // when use `npm run build` will get part of this config
  dev: {
    // document.title
    documentTitle: '',
    // only working on local service
    port: 3001,
    // ignore on local service
    // after build all assets files publicPath, it will be relative path when this is empty
    publicPath: '',
    // this is for fetch(...), get by process.env.ORIGIN_ENV in you code
    origin: 'https://dev.origin',
    // build output directory name
    outputDir: 'dist'
  },
  // when use `npm run build:prod` will get this config
  prod: {
    // document.title
    documentTitle: '',
    // after build all assets files publicPath, it will be relative path when this is empty 
    publicPath: '/Users/liuyuan076/workspace-private/spinacia-cli/packages/template/spinacia-react-redux/dist',
    // this is for fetch(...), get by process.env.ORIGIN_ENV in you code
    origin: 'https://prod.origin',
    // output directory name
    outputDir: 'dist'
  }
}