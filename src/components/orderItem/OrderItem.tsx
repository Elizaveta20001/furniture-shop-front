import React from "react";

import './orderItem.css';


const OrderItem: React.FC<{ item: any }> = ({item}) => {

    return (
        <div className="order-item">
            <div className="order-item-image-container">
                <img alt={item.title} src={item.url}/>
            </div>
            <div className="order-item-data">
                <h5>{item.title}</h5>
            </div>
            <div className="order-item-data">
                <h5>{item.quantity} x ${item.price}</h5>
            </div>
        </div>
    )
}


export default OrderItem;
