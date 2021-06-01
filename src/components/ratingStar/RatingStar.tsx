import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {templateFetch} from "../../helpers/templatePost";
import {fetchCollectionItem} from "../../modules/catalog/collectionItemPage/store/actions";

import './ratingStar.css';


const RatingStar: React.FC<{ url: string, value: number }> = ({url, value}) => {
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const dispatch = useDispatch();
    const history = useHistory();

    const refreshData = () =>{
        dispatch(fetchCollectionItem(history.location.pathname));
    }

    const handleClick = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        templateFetch(url, {value: value, userId: userId}, refreshData);
    }

    return (
        <div>
            <button type='submit' className="material-icons dp48 star" onClick={handleClick}>star_border</button>
        </div>
    )
}


export default RatingStar;