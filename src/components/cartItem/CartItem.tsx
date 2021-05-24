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
            <div className="cart-item-title">
                <h5>{item.title}</h5>
            </div>
            <div className="cart-item-quantity">
                <button className="button_fro_cart_items" onClick={handleIncreaseClick}/>
                <h5>{item.quantity}</h5>
                <button className="button_fro_cart_items" onClick={handleDecreaseClick}/>
            </div>
            <div>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    )
}


export default CartItem;