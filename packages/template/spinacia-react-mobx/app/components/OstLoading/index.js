import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';
import OstMask from '../OstMask/index'


class OstLoading extends Component {
  render() {
    const {isLoading} = this.props;

    return <OstMask show={isLoading} >
      <div className="ost-loading">
        <span className="ost-loading-svg" ></span>
      </div>
    </OstMask>
  }
}


export default OstLoading;

OstLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
