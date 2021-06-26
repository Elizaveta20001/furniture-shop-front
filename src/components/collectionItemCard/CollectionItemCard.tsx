import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {CollectionItemCardInterface} from "../../interfaces/interfaces";
import {addItemToTheCart} from "../../modules/cart/store/actions";
import {getRating} from "../../helpers/rating";

import "./colectionItemCard.css";
import RatingBox from "../ratingBox/RatingBox";
import {addToUserFavorites} from "../../modules/user-profile/favoritesTab/store/actions";


const CollectionItemCard = ({title, description, price, url, id, rating}: CollectionItemCardInterface) => {
    const isAuthenticated = useSelector((state: Store) => state.loginReducer.isEnter);
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const dispatch = useDispatch();

    const calculatedRating = getRating(rating)

    const handleAddToCart = () => {
        dispatch(addItemToTheCart({
            title,
            description,
            price,
            url,
            id
        }))
    }

    const handleAddToFavorites = () => {
        dispatch(addToUserFavorites(id, userId, token))
    }

    return (
        <div className='collection_item_container'>
            <div className="image_container_for_collection_items">
                <img  alt={title} src={url}/>
            </div>
            <div className="container_for_collection_item_data">
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <div className="text">
                    <h6>{description}</h6>
                </div>
                <div className='rating'>
                    <RatingBox value={calculatedRating}/>

                </div>
                <div className="container_for_price">
                    <div className="text">
                        <h4>Price: ${price}</h4>
                    </div>
                    <div className="option">
                        {
                            isAuthenticated ? null
                                : (
                                    <div className="collection-item-card-buttons-container">
                                        <button
                                            className='waves-effect waves-light btn custom-button collection-item-card-button'
                                            onClick={handleAddToFavorites}
                                        >
                                            <i className="material-icons small">favorite_border</i>
                                        </button>
                                        <button
                                            className='waves-effect waves-light btn custom-button collection-item-card-button'
                                            onClick={handleAddToCart}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};


export default CollectionItemCard;
