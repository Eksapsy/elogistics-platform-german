/**
 * Copyrights Claims Apostolis Anastasiou
 * Email: Apostolos.Anastasiou.Alpha@gmail.com
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/storeConfigurations';
import registerServiceWorker from './registerServiceWorker';


console.log('%cApp Version 1.2.0\n%cDo not attempt to do anything in the console.\t\n%cContact with the developer %capostolis.anastasiou.alpha@gmail.com\t', 'background-color: #212121; color: #1ab7ea; font-size: 28px', 'background-color: #212121; color: #bd081c; font-size: 16px', 'background-color: #212121; color: #1ab7ea; font-size: 12px', 'background-color: #212121; color: #1ab7ea; font-weight: 900; font-size: 12px');

const store = configureStore();

const rootEl = document.getElementById('root');

ReactDOM.render(<Provider store={ store }>
                  <App/>
                </Provider>,
  rootEl);
registerServiceWorker();
