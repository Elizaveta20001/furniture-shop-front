import {useDispatch, useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import CartItem from "../../components/cartItem/CartItem";
import EmptyCart from "../../components/emptyCart/EmptyCart";

import {getTotalPrice, convertDataToSave} from "../../helpers/cart";
import {removeAllItems} from "./store/actions";

import './cartPage.css';
import {clearUserOrdersMessage, saveUserOrder} from "../user-profile/ordersTab/store/actions";
import {useMessage} from "../../hooks/message.hook";
import {useEffect} from "react";


export const CartPage: React.FC = () => {
    const data = useSelector((state: Store) => state.cartReducer.items);
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const userToken = useSelector((state: Store) => state.loginReducer.token);
    const saveOrderNorification = useSelector((state: Store) => state.userReducer.userOrdersReducer.message);
    const dispatch = useDispatch();
    const message = useMessage();
    const totalPrice = getTotalPrice(data);

    useEffect(() => {
        message(saveOrderNorification);

        return () => {
            dispatch(clearUserOrdersMessage())
        }

    }, [message, saveOrderNorification])

    const onToken = (token: any) => {
        const body = {
            token,
            totalPrice
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }

        return fetch('/payment', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        }).then(() => {
            alert("Success");
            dispatch(saveUserOrder(convertDataToSave(data), userId, userToken));
            dispatch(removeAllItems());
        }).catch(error => {
            alert(error);
        })
    }

    return (
        <div className="card">
            <div className="card-content">
                {
                    data.length === 0 ? <EmptyCart/>
                        : <div>
                            {data.map(element => <CartItem item={element} key={element.title}/>)}
                            <h1>Total price: {totalPrice}$</h1>
                            <StripeCheckout
                                token={onToken}
                                stripeKey='pk_test_51J4nhrEW5NP5toW9jnaYnqIu0ThoQtCYn5WSWELZneGmSmi2dxBMtmZzTCQDDTL6vPhWa2MWBoqCW6xumh87CQ7y00P89vFLz8'
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
