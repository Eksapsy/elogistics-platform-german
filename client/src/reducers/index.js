import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import emailyFormReducer from './formDataReducer';

export default combineReducers({
  dataBinded: dataReducer,
  emailForm: emailyFormReducer
});