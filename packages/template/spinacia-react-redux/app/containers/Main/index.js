import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { OstLoading } from 'ost-ui';
import { Connect } from './connect';
import './style.less';
import SPINACIA from './SPINACIA.svg';
import pkg from '../../../package.json';
import Version from './components/Version'


class Main extends Component {

  constructor(props, context) {
    super(props, context);
    const { actions } = this.props;
    actions.initMainPage();
    document.title = 'spinacia-react-redux';
  }

  render() {
    const { isFetching } = this.props;
    const {webpack} = pkg.devDependencies;
    const {react, redux} = pkg.dependencies;

    return ([
      <OstLoading key='0' isLoading={isFetching} />,
      isFetching
        ? null
        : <div className="Main" key='1'>
          <img src={SPINACIA} alt=""/>
          <h2>SPINACIA-REACT</h2>
          <span>react with redux</span>
          <Version
            list={[
              {webpack},
              {react},
              {redux},
              {'react-router': pkg.dependencies['react-router']},
            ]} />
        </div>
    ])}
}

Main.propTypes = {
  actions: PropTypes.object,
  isFetching: PropTypes.bool
}

export default Connect(Main);
