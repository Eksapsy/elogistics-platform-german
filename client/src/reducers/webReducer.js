import { TOGGLE_LOADER, LOGIN } from '../actions/types';

const initialReducer = {
  loading: false,
  isLoggedIn: false
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
        isLoggedIn: action.isLoggedIn
      }
    default:
      return state;
  }
};