const fs = require("fs-extra");
const path = require('path');
const latestVersion = require('latest-version');


const createPkgJson = async (templateDir, installPath) => {

    const installPkgJson = path.resolve(installPath, 'package.json');
    const appName = path.basename(installPath);

    let json = {};

    if (/template\/spinacia-react-redux/g.test(templateDir)) {
        json = {
            "name": appName || "spinacia-react-redux",
            "version": "0.0.1",
            "description": "react with redux",
            "scripts": {
              "start": "spinacia-script start",
              "test": "cross-env BABEL_ENV=test eslint app --fix",
              "build": "spinacia-script build",
              "build:prod": "spinacia-script build-prod"
            },
            "keywords": [
              "spinacia",
              "react",
              "react-redux",
              "cli"
            ],
            "repository": {
              "type": "git",
              "url": "https://github.com/guibwl/spinacia-cli"
            },
            "author": "guibwl",
            "license": "ISC",
            "devDependencies": {},
            "dependencies": {
              "@babel/polyfill": "^7.4.4",
              "antd-mobile": "^2.2.2",
              "history": "^4.7.2",
              "ost-ui": "^0.0.7",
              "prop-types": "^15.6.2",
              "react": "^16.4.1",
              "react-dom": "^16.4.1",
              "react-redux": "^5.0.7",
              "react-route": "^1.0.3",
              "react-router": "^4.3.1",
              "react-router-dom": "^4.3.1",
              "redux": "^4.0.0",
              "redux-thunk": "^2.3.0",
              "spinacia-script": `^${await latestVersion('spinacia-script')}`
            },
            "eslintConfig": {
              "extends": "spinacia-app"
            }
          }
    }


    // modifie template package.json
    fs.writeFileSync(installPkgJson, JSON.stringify(json, null, 2));
    
}

export default createPkgJson;