import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import webReducer from './webReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  dataBinded: dataReducer,
  webData: webReducer,
  form: formReducer
});
