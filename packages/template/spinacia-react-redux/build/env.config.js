// this env does not match process.env.NODE_ENV
// this is match process.env.BUILD_ENV

module.exports = {
  // when use `npm run build`, you will get this config 
  dev: {
    // after build all assets files publicPath, it will be relative path when this is empty
    // ignore on local service
    publicPath: '',
    // this is for fetch(...), get by process.env.ORIGIN_ENV in you code
    origin: 'https://dev.origin',
    // build output directory name
    outputDir: 'dist'
  },
  // when use `npm run build:prod`, you will get this config
  prod: {
    // after build all assets files publicPath, it will be relative path when this is empty 
    publicPath: '/Users/liuyuan076/workspace-private/spinacia-cli/packages/template/spinacia-react-redux/dist',
    // this is for fetch(...), get by process.env.ORIGIN_ENV in you code
    origin: 'https://prod.origin',
    // output directory name
    outputDir: 'dist'
  }
}