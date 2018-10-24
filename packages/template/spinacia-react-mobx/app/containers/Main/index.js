import React, {Component} from 'react';
import {inject,observer} from 'mobx-react'
import PropTypes from 'prop-types';
import { OstLoading } from 'ost-ui';
import './style.less';
import SPINACIA from './SPINACIA.svg';
import pkg from '../../../package.json';
import Version from './components/Version'

@inject(({AppStore,MainStore})=>({
  AppStore,
  MainStore
}))

@observer
class Main extends Component {

  constructor(props, context) {
    super(props, context);
    document.title = 'spinacia-react-mobx';
  }

  render() {
    const { isFetching } = this.props.MainStore;
    const {webpack} = pkg.devDependencies;
    const {react, mobx} = pkg.dependencies;

    return ([
      <OstLoading key='0' isLoading={isFetching} />,
      isFetching
        ? null
        : <div className="Main" key='1'>
          <img src={SPINACIA} alt=""/>
          <h2>SPINACIA-REACT</h2>
          <span>react with mobx</span>
          <Version
            list={[
              {webpack},
              {react},
              {mobx},
              {'react-router': pkg.dependencies['react-router']},
            ]} />
        </div>
    ])}
}

Main.propTypes = {
  isFetching: PropTypes.bool
}

export default Main;
