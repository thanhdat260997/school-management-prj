import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  CLEAR_NOTIFICATION
} from '../utils/constants';

export const login = () => {
  return { type: LOG_IN };
};

export const loginSuccess = (token, username, isAdmin) => {
  return { type: LOG_IN_SUCCESS, username, isAdmin };
};

export const loginFailed = (error) => {
  return { type: LOG_IN_FAIL, data: error };
};

export const getUserInfo = () => {
  return { type: GET_USER };
};

export const getUserSuccess = (message) => {
  return { type: GET_USER_SUCCESS, data: message };
};

export const getUserFailed = (error) => {
  return { type: GET_USER_FAIL, data: error };
};

export const logout = () => {
  return { type: LOG_OUT };
};

export const logoutSuccess = (message) => {
  localStorage.removeItem('token');
  return { type: LOG_OUT_SUCCESS, data: message };
};

export const logoutFailed = (error) => {
  return { type: LOG_OUT_FAIL, data: error };
};

export const clearNotification = () => {
  return { type: CLEAR_NOTIFICATION };
};
