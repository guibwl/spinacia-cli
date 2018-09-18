import React from 'react';
import './style.less';
import SPINACIA from './SPINACIA.svg'

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('NODE_ENV===>', process.env.NODE_ENV);
  }

  render() {
    return (
      <div className="App">
        <img src={SPINACIA} alt=""/>
        <h2>SPINACIA-CLI</h2>
        <span>pure react cli for you</span>
      </div>
    );
  }
}