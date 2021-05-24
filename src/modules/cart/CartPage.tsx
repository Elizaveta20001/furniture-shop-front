import {useSelector} from "react-redux";

import CartItem from "../../components/cartItem/CartItem";

import './cartPage.css';


export const CartPage: React.FC = () => {
    const data = useSelector((state: Store) => state.cartReducer.items)
    return (
        <div className="cart-page">
            {
                data.length === 0 ? <h1>Empty page</h1>
                    : data.map(element => <CartItem item={element} key={element.title}/>)
            }
        </div>
    )
};