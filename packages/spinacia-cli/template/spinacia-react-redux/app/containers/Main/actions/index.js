import {fetchingAction} from '../../App/action';

export const initMainPage = () => (dispatch, getState) => {
  const {requestStateGroup} = getState().AppReducer;
  const fetchingName = 'initMainRequest';

  if (requestStateGroup[fetchingName]) return;

  dispatch(fetchingAction({[fetchingName]: true}));

  setTimeout(() => {
    dispatch(fetchingAction({[fetchingName]: false}));
  }, 1500);
}

