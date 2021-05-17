import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/index';

import './index.css';
import 'materialize-css';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
