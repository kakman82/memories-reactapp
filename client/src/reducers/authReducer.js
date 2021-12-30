import * as types from '../actions/types';

const initialState = {
  authData: null,
  authAlert: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action?.payload.result,
        authAlert: action?.payload.alert,
      };
    case types.AUTH_ALERT:
      return {
        ...state,
        authAlert: action.payload.alert,
      };
    case types.LOGOUT:
      localStorage.removeItem('profile');
      return {
        ...state,
        authData: null,
        authAlert: null,
      };
    case types.CLEAR_TOAST_MSG:
      return {
        authAlert: null,
      };
    default:
      return state;
  }
};

export default authReducer;
