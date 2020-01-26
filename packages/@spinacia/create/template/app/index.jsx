import { consts } from 'yzt-jssdk';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RouteConfig from './config/router-core/index';
import rootReducer from './config/reducer';
import './css/resets.less';
import './css/common.less';

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

if(window.VConsole && consts.isStg() ){
    new window.VConsole();
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const MyComponent = () => (
  <Provider store={store}>
    <RouteConfig />
  </Provider>
);

export default MyComponent;
