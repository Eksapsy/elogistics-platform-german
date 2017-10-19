import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import formDataReducer from './formDataReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  dataBinded: dataReducer,
  emailForm: formDataReducer,
  form: formReducer
});
