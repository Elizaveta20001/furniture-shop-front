import {useCallback, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useMessage} from '../../hooks/message.hook';

import {SearchBar} from '../../modules/searchField/SearchBar';
import CartItemNumber from "../cartItemNumber/CartItemNumber";

import {clearUserCommentsMessage} from "../../modules/user-profile/commentsTab/store/actions";
import {clearUserRatingsMessage} from "../../modules/user-profile/ratingsTab/store/actions";
import {clearUserOrdersMessage} from "../../modules/user-profile/ordersTab/store/actions";
import {clearUserFavoritesMessage} from "../../modules/user-profile/favoritesTab/store/actions";
import {clearMessage, enter, logout} from '../../modules/authorization/store/actions';
import {clearCollectionError} from "../../modules/catalog/collection/store/actions";

import './navbar.css';



interface Props {
    isAuthenticated: boolean
}


const Navbar: React.FC<Props> = ({isAuthenticated}) => {

    const dispatch = useDispatch();
    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);
    const fetchCollectionNotification = useSelector((state: Store) => state.catalogReducer.collectionReducer.error);
    const userDataNotification = useSelector((state: Store) => state.userReducer.userDataReducer.message);
    const userCommentsNotification = useSelector((state: Store) => state.userReducer.userCommentsReducer.message);
    const userRatingsNotification = useSelector((state: Store) => state.userReducer.userRatingsReducer.message);
    const userOrdersNotification = useSelector((state: Store) => state.userReducer.userOrdersReducer.message);
    const userFavoritesNotification = useSelector((state: Store) => state.userReducer.userFavoritesReducer.message);

    useEffect(() => {
        message(fetchCollectionNotification);
        return () => {
            dispatch(clearCollectionError());
        }
    }, [dispatch, fetchCollectionNotification,message]);

    useEffect(() => {
        message(userDataNotification);
        return () => {
            dispatch(clearMessage());
        }
    }, [dispatch, userDataNotification,message]);

    useEffect(() => {
        if (userCommentsNotification !== 'no authorization') message(userCommentsNotification);
        return () => {
            dispatch(clearUserCommentsMessage());
        }
    }, [dispatch, userCommentsNotification,message])

    useEffect(() => {
        if (userRatingsNotification !== 'no authorization') message(userRatingsNotification);
        return () => {
            dispatch(clearUserRatingsMessage());
        }
    }, [dispatch, userRatingsNotification,message])

    useEffect(() => {
        if (userOrdersNotification !== 'no authorization') message(userOrdersNotification);
        return () => {
            dispatch(clearUserOrdersMessage());
        }
    }, [dispatch, userOrdersNotification,message])

    useEffect(() => {
        if (userFavoritesNotification !== 'no authorization') message(userFavoritesNotification);
        return () => {
            dispatch(clearUserFavoritesMessage());
        }
    }, [dispatch, userFavoritesNotification,message])

    useEffect(() => {
        if (err === 'logout') message(err);
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
        } catch (e) {
        }
    }, [dispatch])

    const enterHandler = () => {
        dispatch(enter(false));
        dispatch(clearMessage());
    }


    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <span className="brand-logo"><NavLink to="/home">FURNITURE SHOP</NavLink></span>
                    <SearchBar/>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/catalog">CATALOG</NavLink></li>
                        <li><NavLink to="/contacts">CONTACTS</NavLink></li>
                        {isAuthenticated && <li><NavLink to="/user-profile">USER PROFILE</NavLink></li>}
                        {isAuthenticated && <li><NavLink to="/cart">CART</NavLink></li>}
                        {isAuthenticated && <CartItemNumber/>}
                        {isAuthenticated && <li><NavLink onClick={logoutHandler} to="/home">LOGOUT</NavLink></li>}
                        {!isAuthenticated && <li><NavLink onClick={enterHandler} to="/auth">LOGIN</NavLink></li>}
                    </ul>
                </div>
            </nav>
        </div>
    )
};


export default Navbar;
