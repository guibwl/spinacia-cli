import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index';

const Actions = Object.assign({}, actions)

export const Connect = (Container) => {

  function mapStateToProps(state) {
    const {isFetching} = state.AppReducer;

    return {
      isFetching
    };
  }

  function mapActionToProps(dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    }
  }

  return connect(mapStateToProps, mapActionToProps)(Container);
}
