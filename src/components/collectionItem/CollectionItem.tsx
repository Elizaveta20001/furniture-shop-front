import React, {useCallback} from "react";

import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

import {CollectionItemProps} from "../../interfaces/interfaces";
import {addItemToTheCart} from "../../modules/cart/store/actions";
import {addToUserFavorites, fetchUserFavorites} from "../../modules/user-profile/favoritesTab/store/actions";

import "./collectionItem.css";



const CollectionItem: React.FC<CollectionItemProps> = ({title, price, url, id, description,collectionName, history}) => {
    const isAuthenticated = useSelector((state: Store) => state.loginReducer.isEnter);
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userFavorites = useSelector((state: Store) => state.userReducer.userFavoritesReducer.userFavorites);

    const dispatch = useDispatch();

    const isFavorite = userFavorites.some(favoritesItem => favoritesItem.id === id);

    const handleAddToCart = () => {
        dispatch(addItemToTheCart({
            title,
            price,
            description,
            id,
            url
        }));
    }

    const handleAddToFavorites = useCallback(
        () => {
            dispatch(addToUserFavorites(id, userId, token));
            dispatch(fetchUserFavorites(userId, token));
        },[dispatch, id, userId, token]
    )

    const handleExpand = () => history.push(`${collectionName}/${id}`)

    return (
        <div className="collection_item">
            <div className="background_image">
                <img alt={title} src={url} onClick={handleExpand}/>
            </div>
            <div className="data_container">
                <h6 className="collection-item-title">{title}</h6>
                <div className="collection-item-bottom-container">
                    <h6>${price}</h6>
                    {
                        isAuthenticated
                            ? <button
                                className='waves-effect waves-light btn custom-collection-item-button'
                                onClick={handleExpand}>
                                <i className="material-icons small">chevron_right</i>
                            </button>
                            : <div className="collection-item-buttons-container">
                                <button
                                    className='waves-effect waves-light btn custom-collection-item-button'
                                    onClick={handleAddToFavorites}
                                >
                                    {
                                        isFavorite
                                            ? <i className="material-icons small">favorite</i>
                                            : <i className="material-icons small">favorite_border</i>

                                    }
                                </button>
                                <button
                                    className='waves-effect waves-light btn custom-collection-item-button'
                                    onClick={handleAddToCart}>
                                    <i className="material-icons small">shopping_cart</i>
                                </button>
                            </div>

                    }
                </div>
            </div>

        </div>
    )
};


export default withRouter(CollectionItem);
