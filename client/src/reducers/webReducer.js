import { TOGGLE_LOADER, LOGIN, FETCH_USER } from '../actions/types';
import axios from 'axios';

const initialReducer = {
  loading: false,
  profile: false
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
    default:
      return state;
  }
};