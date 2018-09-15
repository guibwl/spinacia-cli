import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RouteConfig from './config/router-core/index';
import rootReducer from './config/reducer';
import './css/resets.less';
import './css/common.less';


const store = createStore(
  rootReducer,
  window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const MyComponent = () => (
  <Provider store={store}>
    <RouteConfig/>
  </Provider>
);

export default MyComponent;
