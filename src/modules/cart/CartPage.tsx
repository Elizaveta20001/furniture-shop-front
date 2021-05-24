import {useSelector} from "react-redux";

import CartItem from "../../components/cartItem/CartItem";
import EmptyCart from "../../components/emptyCart/EmptyCart";

import {getTotalPrice} from "../../helpers/cart";

import './cartPage.css';


export const CartPage: React.FC = () => {
    const data = useSelector((state: Store) => state.cartReducer.items);
    const totalPrice = getTotalPrice(data);
    return (
        <div>
        <div className="cart-page">
            {
                data.length === 0 ? <EmptyCart/>
                    : data.map(element => <CartItem item={element} key={element.title}/>)
            }
        </div>
            <h1>Total price: {totalPrice}$</h1>
        </div>
    )
};