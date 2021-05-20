import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { clearMessage, enter, logout } from '../../modules/authorization/store/actions';
import { useMessage } from '../../hooks/message.hook';

import './navbar.css';

interface Props {
    isAuthenticated: boolean
}


const Navbar: React.FC<Props> = ({isAuthenticated}) => {

    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if(err === 'logout') message(err);
      }, [
          err, 
          message, 
        ])
    
    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    

    const logoutHandler = useCallback(() => {
        try {
            dispatch(logout());
            localStorage.removeItem('userData');
            dispatch(enter(true));
        } catch(e){}
    }, [dispatch])

    const enterHandler = () => {
        dispatch(enter(false));
        dispatch(clearMessage())
    }


    return (
        <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper blue darken-1">
            {/* <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem'}}> */}
            <span className="brand-logo"><NavLink to="/home">furniture shop</NavLink></span>       
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/main">main</NavLink></li>
                <li><NavLink to="/contacts">contacts</NavLink></li>
                {isAuthenticated && <li><NavLink to="/basket">basket</NavLink></li>}
                {isAuthenticated && <li><NavLink onClick={logoutHandler} to="/home">logout</NavLink></li>}
                {!isAuthenticated && <li><NavLink onClick={enterHandler} to="/auth">login</NavLink></li>}
            </ul>
            </div>
        </nav>
        </div>
    )
};


export default Navbar;