import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OstMask } from 'ost-ui';
import './style.less';

class Version extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  closePopup = () => this.setState({show: false});
  showPopup = () => this.setState({show: true});

  render() {
    const {list} = this.props;
    return ([
      <OstMask show={this.state.show} onClick={this.closePopup} key="0">
        <div className="version">
          <ul>
            {
              list.map((item, idx) => {
                const _key = Object.keys(item)[0];

                return (
                  <li key={idx}>
                    <span>
                      { _key } :
                    </span>
                    <i>
                      { item[_key] }
                    </i>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </OstMask>,
      <button className="version-btn" onClick={this.showPopup} key="1">version</button>
    ]);
  }
}

export default Version;

Version.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
}
