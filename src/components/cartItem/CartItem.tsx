import React from "react";

import './cartItem.css';
import {useDispatch} from "react-redux";
import {removeAllItems, removeOneItems} from "../../modules/cart/store/actions";


const CartItem: React.FC<{item: any}> = ({item}) =>{
    const dispatch = useDispatch();

    const handleDeleteClick = () =>{
        dispatch(removeOneItems(item));
    }


    return(
        <div className="cart-item">
            <div className="image-container">
                <img alt={item.title} src={item.url}/>
            </div>
            <div className="cart-item-title">
                <h5>{item.title}</h5>
            </div>
            <div className="cart-item-quantity">
                <button className="button_fro_cart_items"/>
                <h5>{item.quantity}</h5>
                <button className="button_fro_cart_items"/>
            </div>
            <div>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    )
}


export default CartItem;