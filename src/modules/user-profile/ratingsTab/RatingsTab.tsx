import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {uriForUserRatings} from "../constants";
import {fetchUserRatings, initUserRatingsState} from "./store/actions";
import EmptyUserProfileTab from "../../../components/emptyUserProfileTab/EmptyUserProfileTab";
import RatingItem from "../../../components/ratingItem/RatingItem";

import "../ordersTab/ordersTab.css"

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

    if (isFetching || userRatings.length < 1)
        return (<div className="card">
            <EmptyUserProfileTab
                text="You haven't left any ratings so far"
                iconName='star_half'
            />
        </div>)

    return (
        <div className="card">
            {
                isFetching || userRatings.length < 1 ?
                    <EmptyUserProfileTab
                        text="You haven't left any ratings so far"
                        iconName='star_half'
                    /> :
                    <div className="card-content">
                        {
                            userRatings.map(
                                (item:any, index:number) => <RatingItem key={index} item={item}/>
                            )
                        }
                    </div>
            }
        </div>
    )
}
