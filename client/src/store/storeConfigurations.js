import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
export default () => {
  if (process.env.NODE_ENV === "production") {
    return createStore(combinedReducers, {});
  } else {
    // Redux Chrome Tool - Middleware
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return  createStore(combinedReducers, {}, composeEnhancers(applyMiddleware(thunk)));
  }
}