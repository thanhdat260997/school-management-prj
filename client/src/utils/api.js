import qs from 'qs';
import { BASE_URL, SIGNIN_ENDPOINT, USER_INFO_ENDPOINT, DASHBOARD_ENDPOINT, USERS_ENDPOINT, ROOMS_ENDPOINT,CLASSES_ENDPOINT } from './constants';
import { authHeader } from './authedHeader'

const login = (username, password) => {
  const options = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      "username": username,
      "password": password
    })
  };
  return fetch(BASE_URL + SIGNIN_ENDPOINT, options)
    .then(res => res.json());
};

const logout = () => {
  localStorage.removeItem('user');
  return Promise.resolve()
};

const getUserInfo = () => {
  const options = {
    method: 'get',
    headers: authHeader()
  };
  return fetch(BASE_URL + USER_INFO_ENDPOINT, options)
    .then(res => res.json());
};

const getClassList = () => {
  const options = {
    method: 'get',
    headers: authHeader()
  };
  return fetch(BASE_URL + CLASSES_ENDPOINT, options)
    .then(res => res.json());
}

const deleteClass = (id) => {
  const options = {
    method: 'delete',
    headers: authHeader()
  };
  return fetch(BASE_URL + CLASSES_ENDPOINT + '/' + id, options)
    // .then(res => res.json());
}

export default {
  login, getUserInfo, logout, getClassList, deleteClass,
};
