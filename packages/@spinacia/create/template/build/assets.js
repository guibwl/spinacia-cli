
module.exports = {
  loading: {
    html: './loading/loading.html',
    css: './loading/loading.css'
  },
  devPattern: '',
  dev: {
    libs: {
      css: [],
      js: [
        'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js',
        'https://unpkg.com/react@16/umd/react.production.min.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js',
        'https://cdn.bootcss.com/react-redux/5.0.7/react-redux.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.1.0/redux-thunk.min.js',
        'https://cdn.bootcss.com/react-router/3.2.1/ReactRouter.min.js',

      ]
    }
  },
  prod: {
    libs: {
      css: [],
      js: [
        'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js',
        'https://unpkg.com/react@16/umd/react.production.min.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js',
        'https://cdn.bootcss.com/react-redux/5.0.7/react-redux.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.1.0/redux-thunk.min.js',
        'https://cdn.bootcss.com/react-router/3.2.1/ReactRouter.min.js',
      ]
    }
  }
}
