import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from './action';
import './style.less';


class App extends Component {

  componentWillMount() {
    document.body.style.margin = '0px';
    /** ** 始 － 该段代码用于，监听安卓键盘弹起，防止键盘挡住界面内容 *** */
    if (/Android/i.test(navigator.userAgent)) {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

      window.addEventListener('resize', () => {
        const nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        if (clientHeight > nowClientHeight) {
          document.body.style.height = `${clientHeight}px`;
        } else if (clientHeight === nowClientHeight) {
          document.body.style.height = null;
        }
      });
    }
    /** ** 终 － 该段代码用于，监听安卓键盘弹起，防止键盘挡住界面内容 *** */
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapActionToProps(dispatch) {
  return {
    appAction: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(App);
