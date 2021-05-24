import ReactDOM from 'react-dom';
import {PersistGate} from "redux-persist/integration/react"
import { Provider } from 'react-redux';

import App from './App';
import { store, persistedStore} from './store/index';

import './index.css';
import 'materialize-css';


ReactDOM.render(
  <Provider store={store}>
      <PersistGate persistor={persistedStore}>
          <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);

