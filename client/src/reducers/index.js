import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import formDataReducer from './formDataReducer';

export default combineReducers({
  dataBinded: dataReducer,
  emailForm: formDataReducer,
});