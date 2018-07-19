import React from 'react';
import './style.less';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('NODE_ENV===>', process.env.NODE_ENV);
  }

  render() {
    return (
      <div className="App">
        <h2>SPINACIA-CLI</h2>
        <span>pure react cli for you</span>
      </div>
    );
  }
}