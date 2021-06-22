import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import EmptyUserProfileComments from "../../../components/emptyUserProfileComments/EmptyUserProfileComments";
import {fetchUserRatings, initUserRatingsState} from "./store/actions";
import {uriForUserRatings} from "../constants";

export const RatingsTab: React.FC = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userRatings  = useSelector((state: Store) => state.userReducer.userRatingsReducer.userRatings);
    const isFetching = useSelector((state: Store) => state.userReducer.userRatingsReducer.isFetching);

    useEffect(() => {
        initUserRatingsState()
        dispatch(fetchUserRatings(uriForUserRatings,userId,token))
    }, [dispatch, userId, token]);

    useEffect(() => console.log('userRatings',userRatings), [userRatings])

    return (
        <div className="card">
            {/*{*/}
            {/*    isFetching || userOrders.length < 1 ? <EmptyUserProfileComments/> :*/}
            {/*        <div className="card-content">*/}
            {/*            {*/}
            {/*                userOrders.map((order:any, index:number) => (*/}
            {/*                    <div className="user-profile-order" key={index}>*/}
            {/*                        <div className="user-profile-order-title">*/}
            {/*                            <h5>Order #{index + 1}</h5>*/}
            {/*                            <h5>{new Date(order.date).toLocaleString()}</h5>*/}
            {/*                        </div>*/}
            {/*                        <div className="user-profile-order-items">*/}
            {/*                            {*/}
            {/*                                order.items.map(*/}
            {/*                                    (item:any, index:number) => <OrderItem key={index} item={item}/>*/}
            {/*                                )*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                        <h3>Total: ${getTotalOrderPrice(order.items)}</h3>*/}
            {/*                    </div>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </div>*/}

            {/*}*/}
        </div>
    )
}
