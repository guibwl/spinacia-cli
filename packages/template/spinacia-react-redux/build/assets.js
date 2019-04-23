
module.exports = {
  dev: {
    cdn: {
      css: [],
      js: [
        'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js',
      ]
    },
    lib: {
      scripts: [
        'http://own.business.com/develpment.js',
      ]
    },
    loading: {
      html: './loading/loading.html',
      css: './loading/loading.css'
    }
  },
  prod: {
    cdn: {
      css: [],
      js: [
        'https://unpkg.com/react@16/umd/react.production.min.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js',
        'https://cdn.bootcss.com/react-redux/5.0.7/react-redux.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.1.0/redux-thunk.min.js',
        'https://cdn.bootcss.com/react-router/3.2.1/ReactRouter.min.js',
      ]
    },
    lib: {
      scripts: [
        'http://own.business.com/production.min.js',
      ],
      styles: [
        'http://own.business.com/production.min.css'
      ]
    },
    loading: {
      html: './loading/loading.html',
      css: './loading/loading.css'
    }
  }
}