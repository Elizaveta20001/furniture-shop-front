import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {CollectionItemProps} from "../../interfaces/interfaces";
import {addItemToTheCart} from "../../modules/cart/store/actions";

import "./collectionItem.css";
import React from "react";



const CollectionItem: React.FC<CollectionItemProps> = ({title, price, url, id, description,collectionName, history}) => {
    const isAuthenticated = useSelector((state: Store) => state.loginReducer.isEnter);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItemToTheCart({
            title,
            price,
            description,
            id,
            url
        }));
    }

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
                            : <button
                                className='waves-effect waves-light btn custom-collection-item-button'
                                onClick={handleAddToCart}>
                                <i className="material-icons small">shopping_cart</i>
                            </button>
                    }
                </div>
            </div>

        </div>
    )
};


export default withRouter(CollectionItem);
