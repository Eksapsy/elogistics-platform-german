/**
 * Copyrights Claims Apostolis Anastasiou
 * Email: Apostolos.Anastasiou.Alpha@gmail.com
 * App Version: 0.7.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/storeConfigurations';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const rootEl = document.getElementById('root');

ReactDOM.render(<Provider store={ store }>
                  <App/>
                </Provider>,
  rootEl);
registerServiceWorker();
