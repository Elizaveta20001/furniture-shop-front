import {useSelector} from "react-redux";

import CartItem from "../../components/cartItem/CartItem";
import EmptyCart from "../../components/emptyCart/EmptyCart";

import './cartPage.css';


export const CartPage: React.FC = () => {
    const data = useSelector((state: Store) => state.cartReducer.items)
    return (
        <div className="cart-page">
            {
                data.length === 0 ? <EmptyCart/>
                    : data.map(element => <CartItem item={element} key={element.title}/>)
            }
        </div>
    )
};