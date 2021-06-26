import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {CollectionItemCardInterface} from "../../interfaces/interfaces";
import {addItemToTheCart} from "../../modules/cart/store/actions";
import {addToUserFavorites} from "../../modules/user-profile/favoritesTab/store/actions";
import {getRating} from "../../helpers/rating";

import RatingBox from "../ratingBox/RatingBox";

import "./colectionItemCard.css";




const CollectionItemCard = ({title, description, price, url, id, rating}: CollectionItemCardInterface) => {
    const isAuthenticated = useSelector((state: Store) => state.loginReducer.isEnter);
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const [isFullDescription, setIsFullDescription] = useState(false);

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

    const toggleShowDescription = (): any => setIsFullDescription(true);
    const toggleHideDescription = (): any => setIsFullDescription(false);


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
                    <h6>
                        {
                            isFullDescription
                                ? <div>
                                    {description}
                                    <button
                                        className="btn-flat expand-text-button"
                                        onClick={toggleHideDescription}
                                    >
                                        <i className="material-icons small">expand_less</i>
                                    </button>
                                </div>
                                : <div>
                                    {
                                        description.length > 200
                                            ? <div>
                                                {description.slice(0,200)}...
                                                <button
                                                    className="btn-flat expand-text-button"
                                                    onClick={toggleShowDescription}
                                                >
                                                    <i className="material-icons small">expand_more</i>
                                                </button>
                                            </div>
                                            : <div>
                                                {description}
                                            </div>
                                    }
                                </div>


                        }
                    </h6>
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
                                    <div className="collection-item-buttons-container">
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
