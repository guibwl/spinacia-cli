# spinacia-react-redux

react 16+, webpack 4.0+, react router 4.0+, redux 4.0+

## Install

``` bash
npx spinacia-cli
```
or

``` bash
npx spinacia-cli <folder name>
```


*[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, run ```npm i -g npm``` to update


It will create a directory called ```spinacia-react-redux``` or ```<folder name>``` inside the current folder.
Inside that directory, it will generate the initial project structure:

```bash
spinacia-react-redux
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── favicon.ico
├── package.json
├── postcss.config.js
├── README.md
├── build
│   ├── loading
│   │   ├── loading.css
│   │   └── loading.html
│   ├── index.html
│   ├── index.js
│   ├── server.js
│   └── webpack.config.js
└── src
    ├── components
    ├── config
    │   ├── router-core
    │   ├── env.js
    │   ├── reducer.js
    │   └── route.js
    ├── containers
    │   ├── App
    │   │   ├── action.js
    │   │   ├── constant.js
    │   │   ├── index.js
    │   │   ├── reducer.js
    │   │   └── style.less
    │   └── Main
    │         ├── action
    │         ├── components
    │         ├── connect
    │         ├── constants
    │         ├── reducers
    │         ├── index.js
    │         ├── SPINACIA.svg
    │         └── style.less
    ├── css
    │   ├── common.less
    │   └── resets.less
    ├── utils
    │   └── request.js
    └── index.jsx
```

now open your project folder:

``` cd spinacia-react-redux```

or

``` cd <folder name>```

## start develop

``` npm start ```

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

open:  http://localhost:3000/

## start production

``` npm run build ```

Builds the app for production to the ```dist``` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!



