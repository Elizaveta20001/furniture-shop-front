import {useEffect, useState} from "react";
import {uriForUserComments} from "../constants";
import {fetchUserComments} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import {userComment, UserComments} from "../../../interfaces/interfaces";
import {Loader} from "../../../components/loader/Loader";
import {UserProfileCommentsSubTab} from "./userProfileCommentsSubTab/UserProfileCommentsSubTab";

const defaultUserComment:userComment= {
    text: '',
    createdAt: new Date(),
    id: ''
}

const defaultUserCommentsData:UserComments = {
    comments: [defaultUserComment],
    description: '',
    price: 0,
    title: '',
    url: '',
    id: 0
}



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

    const [userCommentsData, setUserCommentsData] = useState([defaultUserCommentsData]);

    useEffect(() => {
        dispatch(fetchUserComments(uriForUserComments, userId, token));
        console.log('userComments',userComments);
    }, [dispatch, userId, token]);

    useEffect(() => {
        console.log('userComments2',userComments);
        setUserCommentsData({...userComments});
        console.log('userCommentsData',userCommentsData);

    }, [userComments])

    return (
        <div className="card without-margin-top">
            <div >
                {
                    isFetching || isUserDataFetching || isUserDataUpdating ? <Loader/> :
                     <UserProfileCommentsSubTab
                         comments={userComments}
                         user={userData}
                     />
                }
            </div>
        </div>
    )
}
