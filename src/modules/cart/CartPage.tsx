import {useDispatch, useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import CartItem from "../../components/cartItem/CartItem";
import EmptyCart from "../../components/emptyCart/EmptyCart";

import {getTotalPrice} from "../../helpers/cart";
import {removeAllItems} from "./store/actions";

import './cartPage.css';


export const CartPage: React.FC = () => {
    const data = useSelector((state: Store) => state.cartReducer.items);
    const dispatch = useDispatch();
    const totalPrice = getTotalPrice(data);

    const onToken = (token: any) => {
        const body = {
            token,
            totalPrice
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch('/payment', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        }).then(() => {
            alert("Success");
            dispatch(removeAllItems());
        }).catch(error => {
            alert(error);
        })
    }

    return (
        <div>
            <div className="cart-page">
                {
                    data.length === 0 ? <EmptyCart/>
                        : <div>
                            {data.map(element => <CartItem item={element} key={element.title}/>)}
                            <h1>Total price: {totalPrice}$</h1>
                            <StripeCheckout
                                token={onToken}
                                stripeKey='pk_test_51IuwMwCxpYbk6oLag4BCocz2g5iWFB9pFWdks8nlVGGBcJ9ChqYjlLCfjZw6SEG8LX23NqFr6Bmddv2mgLKzUlw100RdGAAI3x'
                                amount={totalPrice * 100}
                            >
                                <button className='waves-effect waves-light btn custom-button'>Pay now</button>
                            </StripeCheckout>
                        </div>
                }
            </div>
        </div>
    )
}
;