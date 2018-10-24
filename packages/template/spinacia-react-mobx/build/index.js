import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import MyComponent from '../app/index'

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('../app/index', () => {
    window.location.reload();
    // ReactDOM.render(
    //   <MyComponent />,
    //   document.getElementById('app')
    // )
  });
}
