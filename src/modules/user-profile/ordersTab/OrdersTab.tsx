import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchUserOrders, initUserOrdersState} from "./store/actions";
import {getTotalOrderPrice} from "../../../helpers/order";
import EmptyUserProfileComments from "../../../components/emptyUserProfileComments/EmptyUserProfileComments";
import OrderItem from "../../../components/orderItem/OrderItem";

import "./ordersTab.css"

export const OrdersTab: React.FC = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userOrders  = useSelector((state: Store) => state.userReducer.userOrdersReducer.userOrders);
    const isFetching = useSelector((state: Store) => state.userReducer.userOrdersReducer.isFetching);

    useEffect(() => {
        initUserOrdersState()
        dispatch(fetchUserOrders(userId,token))
    }, [userId, token]);

    if (isFetching || userOrders?.length < 1) return <EmptyUserProfileComments/>

    return (
        <div className="card">
            {
                isFetching || userOrders?.length < 1 ? <EmptyUserProfileComments/> :
                    <div className="card-content">
                            {
                                userOrders.map((order:any, index:number) => (
                                    <div className="user-profile-order" key={index}>
                                        <div className="user-profile-order-title">
                                            <h5>Order #{index + 1}</h5>
                                            <h5>{new Date(order.date).toLocaleString()}</h5>
                                        </div>
                                        <div className="user-profile-order-items">
                                            {
                                                order.items.map(
                                                    (item:any, index:number) => <OrderItem key={index} item={item}/>
                                                )
                                            }
                                        </div>
                                        <h3>Total: ${getTotalOrderPrice(order.items)}</h3>
                                    </div>
                                ))
                            }
                    </div>

            }
        </div>
    )
}
