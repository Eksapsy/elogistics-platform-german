import { TOGGLE_LOADER, LOGIN, FETCH_USER, ERROR, CLEAN_ERROR } from './types';
import axios from 'axios';

export const toggleLoader = (loading = undefined) => async dispatch => {
  dispatch({
    type: TOGGLE_LOADER,
    loading
  })
};

export const login = (username, password) => async dispatch => {
  await axios.post('/api/login', {
    username,
    password
  })
    .catch(err => {
      console.error('Error received while trying to login.');
      console.error(err);
      dispatch({
        type: ERROR,
        error: err.message,
        reload: true
      });
    });

  const res = await axios.get('/api/profile')
    .catch(err => {
      console.error('Error received while fetching profile.');
      console.error(err);
      dispatch({
        type: ERROR,
        error: err.message,
        reload: true
      });
    });
  dispatch({
    type: LOGIN,
    profile: res.data
  });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/profile')
    .catch(err => {
      console.error('Error received while fetching user.');
      console.error(err);
      dispatch({
        type: ERROR,
        error: err.message,
        reload: true
      });
    });
  dispatch({
    type: FETCH_USER,
    profile: res.data || false
  });
};

export const error = (errorMessage, reload) => async dispatch => {
  dispatch({
    type: ERROR,
    error: errorMessage,
    reload
  })
};

export const cleanError = () => async dispatch => {
  dispatch({
    type: CLEAN_ERROR
  })
};