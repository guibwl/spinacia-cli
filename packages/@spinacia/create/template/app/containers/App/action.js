import { FETCHING_STATE } from './constant';


function updataFetching(newState) {
  return {
    type: FETCHING_STATE,
    newState
  };
}

export const fetchingAction = (requestState) => (dispatch, getState) => {
  const { requestStateGroup } = getState().AppReducer;
  const newRequestStateGroup = { ...requestStateGroup, ...requestState };
  let isFetching;

  const valueArr = Object.values(newRequestStateGroup);

  try {
    valueArr.forEach((value) => {
      if (value) {
        isFetching = true;
        throw new Error('endInterative');
      } else {
        isFetching = false;
      }
    });
  } catch (error) {
    // ignore
  }


  dispatch(updataFetching({
    isFetching,
    requestStateGroup: { ...requestStateGroup, ...requestState }
  }));
};
