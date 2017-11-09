import { TOGGLE_LOADER, LOGIN, FETCH_USER, ERROR, CLEAN_ERROR } from '../actions/types';
import axios from 'axios';

const initialReducer = {
  loading: false,
  profile: false,
  error: {
    show: false,
    error: '',
    reload: true
  }
};
export default (state = initialReducer, action = {}) => {
  switch (action.type) {
    case TOGGLE_LOADER:
      return {
        ...state,
        loading: action.loading
      }
    case LOGIN:
      return {
        ...state,
        profile: action.profile.user || false
      }
    case FETCH_USER:
      return {
        ...state,
        profile: action.profile.user || false
      }
    case ERROR:
      return {
        ...state,
        error: {
          show: true,
          message: action.error,
          reload: action.reload
        }
      }
    case CLEAN_ERROR:
      return {
        ...state,
        error: {
          show: false,
          reload: true
        }
      }
    default:
      return state;
  }
};