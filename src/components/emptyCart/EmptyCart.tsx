import React from "react";


const EmptyCart: React.FC = () => {
    return(
        <div className="empty-cart">
            <div>
                <h1>Your cart is empty</h1>
            </div>
            <div>
                <i className="material-icons dp48 large">local_grocery_store</i>
            </div>
        </div>
    )
}


export default EmptyCart;