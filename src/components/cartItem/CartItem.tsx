import React from "react";
import {useDispatch} from "react-redux";

import {addItemToTheCart, decreaseItemFromTheCart, removeOneItems} from "../../modules/cart/store/actions";

import './cartItem.css';


const CartItem: React.FC<{ item: any }> = ({item}) => {
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch(removeOneItems(item));
    }

    const handleIncreaseClick = () => {
        dispatch(addItemToTheCart(item));
    }

    const handleDecreaseClick = () => {
        dispatch(decreaseItemFromTheCart(item));
    }


    return (
        <div className="cart-item">
            <div className="image-container">
                <img alt={item.title} src={item.url}/>
            </div>
            <div className="cart-item-data">
                <h5>{item.title}</h5>
            </div>
            <div className="cart-item-data">
                <h5>{item.price}$</h5>
            </div>
            <div className="cart-item-quantity">
                <i className="material-icons dp48 icon-styles" onClick={handleIncreaseClick}>expand_less</i>
                <h5>{item.quantity}</h5>
                <i className="material-icons dp48 icon-styles" onClick={handleDecreaseClick}>expand_more</i>
            </div>
            <div>
                <i className="material-icons dp48 icon-styles cart-item-delete" onClick={handleDeleteClick}>clear</i>
            </div>
        </div>
    )
}


export default CartItem;