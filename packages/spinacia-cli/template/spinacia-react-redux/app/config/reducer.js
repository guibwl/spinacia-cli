import { combineReducers } from 'redux';
import * as AppReducer from '../containers/App/reducer';
import * as MainReducer from '../containers/Main/reducers';

const rootReducer = combineReducers({
  ...AppReducer,
  ...MainReducer
});

export default rootReducer;
