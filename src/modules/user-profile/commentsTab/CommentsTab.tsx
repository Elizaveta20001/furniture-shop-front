import React, {useEffect} from "react";
import {uriForUserComments} from "../constants";
import {fetchUserComments, initUserCommentsState} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import {UserProfileCommentsSubTab} from "./userProfileCommentsSubTab/UserProfileCommentsSubTab";
import EmptyUserProfileTab from "../../../components/emptyUserProfileTab/EmptyUserProfileTab";

export const CommentsTab: React.FC = () => {

    useEffect( () => {
        let collapsibleElems = document.querySelectorAll('.collapsible');
        window.M.Collapsible.init(collapsibleElems);
    })

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userComments  = useSelector((state: Store) => state.userReducer.userCommentsReducer.userComments);
    const isFetching = useSelector((state: Store) => state.userReducer.userCommentsReducer.isFetching);
    const userData  = useSelector((state: Store) => state.userReducer.userDataReducer.userData);
    const isUserDataFetching  = useSelector((state: Store) => state.userReducer.userDataReducer.isFetching);
    const isUserDataUpdating = useSelector((state: Store) => state.userReducer.userDataReducer.isUpdating);

    useEffect(() => {
        initUserCommentsState();
        if (!!userId && !!token) dispatch(fetchUserComments(uriForUserComments, userId, token));

    }, [dispatch, userId, token]);

    if (isFetching || isUserDataFetching || isUserDataUpdating || userComments?.length < 1)
        return (<div className="card">
                    <EmptyUserProfileTab
                        text="You haven't left any comments so far"
                        iconName='comment'
                    />
                </div>)

    return (
        <div className="card">
            <div className="card-content">
                {
                    isFetching || isUserDataFetching || isUserDataUpdating || userComments?.length < 1 ?
                        <EmptyUserProfileTab
                            text="You haven't left any comments so far"
                            iconName='comment'
                        /> :
                        <UserProfileCommentsSubTab
                            comments={userComments}
                            user={userData}
                        />
                }
            </div>
        </div>
    )
}
