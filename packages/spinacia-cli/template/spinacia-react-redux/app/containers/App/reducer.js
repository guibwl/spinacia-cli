/** ********************************************* */
/** ******** Reducer 控制State——业务逻辑 ********** */
/** ********************************************* */
import { FETCHING_STATE } from './constant';

const initState = {
  isFetching: false,
  requestStateGroup: {
    initMainRequest: false
  }
};


export const AppReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHING_STATE:
      return {...state, ...action.newState};
    default:
      return state;
  }
};

export default { AppReducer };
