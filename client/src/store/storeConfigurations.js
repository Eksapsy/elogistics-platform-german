import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';

// Redux Chrome Tool - Middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(combinedReducers, {}, composeEnhancers(applyMiddleware(thunk)));
