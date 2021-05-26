import React from "react";
import {useSelector} from "react-redux";

import {getTotalQuantity} from "../../helpers/cart";

import './cartItemNumber.css';


const CartItemNumber: React.FC = () => {
    const data = useSelector((state: Store) => state.cartReducer.items);
    const totalQuantity = getTotalQuantity(data);

    return(
        <div className="cart-item-number-container">
            <h6>{totalQuantity}</h6>
        </div>
    )
};


export default CartItemNumber;