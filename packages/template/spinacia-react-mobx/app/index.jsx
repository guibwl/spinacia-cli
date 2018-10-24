import React from 'react';
import { Provider } from 'mobx-react';
import RouteConfig from './config/router-core/index';
import store from './config/store';
import './css/resets.less';
import './css/common.less';



const MyComponent = () => (
  <Provider {...store}>
    <RouteConfig/>
  </Provider>
);

export default MyComponent;
