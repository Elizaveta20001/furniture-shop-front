import {useEffect} from "react";
import {uriForUserComments} from "../constants";
import {fetchUserComments, initUserCommentsState} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import {UserProfileCommentsSubTab} from "./userProfileCommentsSubTab/UserProfileCommentsSubTab";
import EmptyUserProfileComments from "../../../components/emptyUserProfileComments/EmptyUserProfileComments";

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
        dispatch(fetchUserComments(uriForUserComments, userId, token));

    }, [dispatch, userId, token]);

    if (isFetching || isUserDataFetching || isUserDataUpdating || userComments?.length < 1) return <EmptyUserProfileComments/>

    return (
        <div className="card">
                {
                    isFetching || isUserDataFetching || isUserDataUpdating || userComments?.length < 1 ? <EmptyUserProfileComments/> :
                     <UserProfileCommentsSubTab
                         comments={userComments}
                         user={userData}
                     />
                }
        </div>
    )
}
