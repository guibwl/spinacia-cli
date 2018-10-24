const autoServer = () => {
  const hostname = window && window.location.hostname;

  if (hostname === 'localhost') {
    return 'test.com.cn';
  }

  if (hostname === 'test') {
    return 'test.com.cn';
  }

  if (hostname === 'production') {
    return 'production.com.cn';
  }

  return hostname;
};
// /////////////////////////////////////////////////////////////////////////////

// http server host
const server = {
  mock: 'mock;http://localhost:7709',
  stage: 'stage;https://test.com.cn',
  prod: 'prod;https://production.com.cn',
  proxy: 'proxy;', // webpack http-proxy-middleware
  native: 'native;',
  auto: `${'auto;https://'}${autoServer()}`
};

// /////////////////////////////////////////////////////////////////////////////
// 选择调试server
// export const env = server.mock;
// export const env = server.stage;
// export const env = server.prod;
// export const env = server.proxy;
// export const env = server.native;
export const env = server.auto;
// /////////////////////////////////////////////////////////////////////////////

export default autoServer;
