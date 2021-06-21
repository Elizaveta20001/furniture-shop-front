import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import EmptyUserProfileComments from "../../../components/emptyUserProfileComments/EmptyUserProfileComments";
import {fetchUserOrders, initUserOrdersState} from "./store/actions";

export const OrdersTab: React.FC = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userOrders  = useSelector((state: Store) => state.userReducer.userOrdersReducer.userOrders);
    const isFetching = useSelector((state: Store) => state.userReducer.userOrdersReducer.isFetching);

    useEffect(() => {
        initUserOrdersState()
        dispatch(fetchUserOrders(userId,token))
    }, [dispatch, userId, token]);

    useEffect(() => console.log('userOrders', userOrders), [userOrders]);

    return (
        <div className="card without-margin-top">
            {
                isFetching || userOrders.length < 1 ? <EmptyUserProfileComments/> :
                    <div>

                        {/*<UserProfileCommentsSubTab*/}
                        {/*    comments={userComments}*/}
                        {/*    user={userData}*/}
                        {/*/>*/}

                    </div>

            }
        </div>
    )
}
