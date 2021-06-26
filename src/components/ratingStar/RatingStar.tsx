import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {templateFetch} from "../../helpers/templatePost";
import {fetchCollectionItem} from "../../modules/catalog/collectionItemPage/store/actions";

import './ratingStar.css';
import {enter, logout} from "../../modules/authorization/store/actions";


const RatingStar: React.FC<{ url: string, value: number }> = ({url, value}) => {
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const dispatch = useDispatch();
    const history = useHistory();

    const refreshData = (data:any, status:number) =>{
        if (status === 200) dispatch(fetchCollectionItem(history.location.pathname));
        if (data.message === 'no authorization') {
            dispatch(logout());
            localStorage.removeItem('userData');
            dispatch(enter(true));
            history.push('/home');
        }
    }

    const handleClick = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        templateFetch(url, {value: value, userId: userId}, token, refreshData);
    }

    return (
        <div>
            <button type='submit' className="material-icons dp48 star" onClick={handleClick}>star_border</button>
        </div>
    )
}


export default RatingStar;
