import {useEffect} from "react";
import {uriForUserComments} from "../constants";
import {fetchUserComments} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";



export const CommentsTab = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userComments  = useSelector((state: Store) => state.userReducer.userCommentsReducer.userComments);

    useEffect(() => {
        dispatch(fetchUserComments(uriForUserComments, userId, token));
        console.log('userComments',userComments);
    }, [dispatch, userId, token]);

    return (
        <div className="card without-margin-top">
            <ul className="collapsible">
                <li>
                    <div className="collapsible-header small-font-size">
                        <i className="material-icons">account_circle</i>
                        Basic information
                    </div>
                    <div className="collapsible-body without-padding">
                        Check
                    </div>
                </li>
            </ul>
        </div>
    )
}
