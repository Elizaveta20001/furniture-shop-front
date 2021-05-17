import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { useRoutes } from './routes';
import { enter } from './modules/authorization/store/actions';
import {CatalogItem} from "./modules/catalog/store/catalog.reducer";
import './app.css';


interface LoginState {
  token: string;
  userId: string;
  isEnter: boolean;
  message: string;
};

interface CatalogState {
  items: CatalogItem[],
  title: string
};

declare global {
  interface Store {
    loginReducer: LoginState;
    catalogReducer: CatalogState
  }
};

const App = () => {
  const [token, setToken] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const isEnter = useSelector((state: Store) => state.loginReducer.isEnter);
  const tokenFromStore: string | boolean = useSelector((state: Store) => state.loginReducer.token);
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData') as string);
    const freshToken: boolean = !!tokenFromStore;

    if(data){
      setToken(data.token);
      dispatch(enter(false));
    } else if(!data && freshToken) {
      setToken(tokenFromStore);
    } else {
      setToken('');
    }

    setAuthenticated(!!token);
  }, [token, tokenFromStore, isEnter, dispatch])

  return (
      <Router>
        <Navbar isAuthenticated={isAuthenticated}/>
        <div className="container">
          <h1>
            {routes}
          </h1>
        </div>
      </Router>
  )
};

export default App;