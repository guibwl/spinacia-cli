import { FETCHING_STATE } from './constant';

export const fetchingAction = requestState => (dispatch, getState) => {
  const {requestStateGroup} = getState().AppReducer;
  const _requestStateGroup = {...requestStateGroup, ...requestState};
  let isFetching;

  for (const key in _requestStateGroup) {
    if (_requestStateGroup[key]) {
      isFetching = true;
      break;
    } else {
      isFetching = false;
    }
  }

  dispatch(updataFetching({
    isFetching: isFetching,
    requestStateGroup: {...requestStateGroup, ...requestState}
  }));
}

function updataFetching(newState) {
  return {
    type: FETCHING_STATE,
    newState
  };
}
