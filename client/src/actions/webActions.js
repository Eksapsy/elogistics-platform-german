import { TOGGLE_LOADER, LOGIN } from './types';
import axios from 'axios';

export const toggleLoader = (loading = undefined) => async dispatch => {
  dispatch({
    type: TOGGLE_LOADER,
    loading
  })
};

export const login = (username, password) => async dispatch => {
  const loginPromise = await axios.post('/api/login', {
    username,
    password
  });
  const isLoggedIn = await loginPromise;
  await console.log('isLoggedIn', isLoggedIn);
  dispatch({
    type: LOGIN,
    isLoggedIn
  });
};