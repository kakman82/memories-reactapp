import * as types from './types';
import * as api from '../api/index';

//* Sign up;
export const signup = (newUser, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(newUser);

    dispatch({
      type: types.AUTH,
      payload: data,
    });
    navigate('/');
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Sign in;
export const signin = (user, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(user);
    dispatch({
      type: types.AUTH,
      payload: data,
    });
    navigate('/');
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: types.AUTH_ALERT,
        payload: error.response.data,
      });
    }
  }
};

//* Clear Server Message;
export const clearAuthAlert = () => {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_TOAST_MSG,
    });
  };
};
