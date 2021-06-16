import api from '../utils/api';
import * as auth from '../actions/auth';
import History from '../utils/history'


export const login = (username, password) => {
  return (dispatch) => {
    dispatch(auth.login(username, password));
    api.login(username, password)
      .then((response) => {
        if (response.error) {
          dispatch(auth.loginFailed(response.error));
        } else {
          localStorage.setItem('token', response.token);
          if (response.isAdmin) History.push('/classes');
          else History.push('/teacher');
          dispatch(auth.loginSuccess(response.token, username, response.isAdmin));
        }
      });
  };
};

export const getUserInfo = () => {
  return (dispatch) => {
    dispatch(auth.getUserInfo());
    api.getUserInfo()
      .then((response) => {
        if (response.error) {
          dispatch(auth.getUserFailed(response.error));
        } else {
          dispatch(auth.getUserSuccess(response));
        }
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(auth.logoutSuccess());
    History.push('/signin');
  };
};

export const clearNotification = () => {
  return (dispatch) => {
    dispatch(auth.clearNotification());
  };
};