import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './App/assets/css/bootstrap.min.css';
import './App/assets/css/icons.css';
import './App/assets/css/style.css';
import './App/assets/js/jquery.min.js';
import './App/assets/js/bootstrap.min.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './App/redux/store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
