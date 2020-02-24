# React app create by @spinacia

## Creating an App

``` bash
npx @spinacia/create
```
@spinacia will creating an app inside a folder named 'my-app' and propety 'name' in the `package.json` will also called same, or you can customize those:

``` bash
npx @spinacia/create [customize-folder-name]
```

*[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, run ```npm i -g npm``` to update


Inside that directory, it will generate the initial project structure:

```bash
.
├── README.ZH.md
├── README.md
├── app
│   ├── assets
│   │   └── SPINACIA.svg
│   ├── components
│   │   └── ...
│   ├── config
│   │   ├── reducer.js
│   │   ├── route.js
│   │   └── router-core
│   │       └── ...
│   ├── containers
│   │   ├── App
│   │   │   ├── action.js
│   │   │   ├── constant.js
│   │   │   ├── index.js
│   │   │   ├── reducer.js
│   │   │   └── style.less
│   │   └── Main
│   │       ├── actions
│   │       │   └── index.js
│   │       ├── components
│   │       │   └── ...
│   │       ├── connect
│   │       │   └── index.js
│   │       ├── constants
│   │       │   └── index.js
│   │       ├── index.js
│   │       ├── reducers
│   │       │   └── index.js
│   │       ├── style.less
│   │       └── ts.tsx
│   ├── css
│   │   ├── common.less
│   │   └── resets.less
│   └── index.jsx
├── build
│   ├── assets.js
│   ├── config.js
│   ├── index.html
│   ├── index.js
│   └── loading
│       ├── loading.css
│       └── loading.html
├── favicon.ico
└── package.json

20 directories, 40 files
```

## Start develop

``` npm start ```
@spinacia will open browser automatic, and if port was occupied, @spinacia will instead other free port.


## Build production

``` npm run build ```
Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.


## Build config

The app support some custom settings.

In `build/config.js`:

```js
module.exports = {
  // Default port for webpack dev server.
  port: 3000,
  // Eslint loader switch.
  eslint: true,
  // When this eslintFix is 'true',
  // eslint loader will automatically fix some code.
  eslintFix: true,
  // Same as document.title,
  // but this will write <title>your setting</title> in the 'index.html'.
  documentTitle: '',
  // Set publicPath for all assets,
  // you need this when you gonna use CDN.
  publicPath: '',
  // build output directory.
  outputDir: 'dist'
};

```

In `build/assets.js`:

```js

module.exports = {
  loading: {
    html: './loading/loading.html',
    css: './loading/loading.css'
  },
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

```



1 build config
2 pre loading...
3 test
4 ts
5 eslint
