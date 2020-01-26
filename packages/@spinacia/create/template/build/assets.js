
module.exports = {
  loading: {
    html: './loading/loading.html',
    css: './loading/loading.css'
  },
  dev: {
    libs: {
      css: [
        'https://test1-city.pingan.com.cn/node/static/common-libs/vconsole@3.3.2/vconsole.min.css',
      ],
      js: [
        'https://test1-city.pingan.com.cn/node/static/common-libs/vconsole@3.3.2/vconsole.min.js',
        // WX
        'https://test1-city.pingan.com.cn/node/static/common-libs/@jweixin/jweixin@1.4.0/jweixin-1.4.0.js',
        // React
        'https://test1-city.pingan.com.cn/node/static/common-libs/@React-libs/react@16.8.6/react.development.js',
        'https://test1-city.pingan.com.cn/node/static/common-libs/@React-libs/react-dom@16.8.6/react-dom.development.js',
        // // Redux
        'https://test1-city.pingan.com.cn/node/static/common-libs/@React-libs/redux@4.0.1/redux.js',
        'https://test1-city.pingan.com.cn/node/static/common-libs/@React-libs/react-redux@5.1.1/react-redux.js',
        'https://test1-city.pingan.com.cn/node/static/common-libs/@React-libs/redux-thunk@2.3.0/redux-thunk.js',
        // // React-router
        'https://test1-city.pingan.com.cn/node/static/common-libs/@React-libs/react-router@4.3.1/react-router.js',
        'https://test1-city.pingan.com.cn/node/static/common-libs/@React-libs/react-router-dom@4.3.1/react-router-dom.js'
      ]
    }
  },
  prod: {
    libs: {
      css: [],
      js: [
        // WX
        'https://s.city.pingan.com.cn/node/static/common-libs/@jweixin/jweixin@1.4.0/jweixin-1.4.0.js',
        // React
        'https://s.city.pingan.com.cn/node/static/common-libs/@React-libs/react@16.8.6/react.development.js',
        'https://s.city.pingan.com.cn/node/static/common-libs/@React-libs/react-dom@16.8.6/react-dom.development.js',
        // Redux
        'https://s.city.pingan.com.cn/node/static/common-libs/@React-libs/redux@4.0.1/redux.js',
        'https://s.city.pingan.com.cn/node/static/common-libs/@React-libs/react-redux@5.1.1/react-redux.js',
        'https://s.city.pingan.com.cn/node/static/common-libs/@React-libs/redux-thunk@2.3.0/redux-thunk.js',
        // // React-router
        'https://s.city.pingan.com.cn/node/static/common-libs/@React-libs/react-router@4.3.1/react-router.js',
        'https://s.city.pingan.com.cn/node/static/common-libs/@React-libs/react-router-dom@4.3.1/react-router-dom.js'
      ]
    }
  }
}
