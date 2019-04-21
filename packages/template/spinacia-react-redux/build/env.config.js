// this env does not match process.env.NODE_ENV
// this is match process.env.BUILD_ENV

module.exports = {
  dev: {
    // after build all assets files publicPath, it will be relative path when this is empty
    // ignore on local service
    publicPath: '',
    // this is for fetch(...), get by process.env.ORIGIN_ENV in you code
    origin: 'https://dev.origin'
  },
  prod: {
    // after build all assets files publicPath, it will be relative path when this is empty 
    publicPath: '/Users/liuyuan076/workspace-private/spinacia-cli/packages/template/spinacia-react-redux/dist',
    // this is for fetch(...), get by process.env.ORIGIN_ENV in you code
    origin: 'https://prod.origin'
  }
}