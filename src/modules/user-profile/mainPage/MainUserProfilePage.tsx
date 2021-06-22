import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMessage} from "../../../hooks/message.hook";

import {clearMessage} from "../personalInfoTab/store/actions";
import {clearUserCommentsMessage} from "../commentsTab/store/actions";
import {BasicInfoSubTab} from "../personalInfoTab/basicInformation/BasicInfoSubTab";
import {ChangePassSubTab} from "../personalInfoTab/changePassword/ChangePassSubTab";
import {CartPage} from "../../cart/CartPage";
import {CommentsTab} from "../commentsTab/CommentsTab";
import {RatingsTab} from "../ratingsTab/RatingsTab";
import {OrdersTab} from "../ordersTab/OrdersTab";

import "./mainUserProfilePage.css";


export const MainUserProfilePage: React.FC = () => {

    const message = useMessage();
    const dispatch = useDispatch();
    const userDataNotification = useSelector((state: Store) => state.userReducer.userDataReducer.message);
    const userCommentsNotification = useSelector((state: Store) => state.userReducer.userDataReducer.message);

    useEffect( () => {
        let tabsElems = document.querySelectorAll('.tabs');
        let collapsibleElems = document.querySelectorAll('.collapsible');
        window.M.Tabs.init(tabsElems);
        window.M.Collapsible.init(collapsibleElems);
    }, [])

    useEffect(() => {
        message(userDataNotification);

        return () => {
            dispatch(clearMessage());
        }
    }, [dispatch, userDataNotification,message])

    useEffect(() => {
        message(userCommentsNotification);

        return () => {
            dispatch(clearUserCommentsMessage());
        }
    }, [dispatch, userCommentsNotification,message])


    return (
        <div>
            <h1>My Profile</h1>

            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s2"><a href="#personal-data">Personal data</a></li>
                        <li className="tab col s2"><a href="#cart">Cart</a></li>
                        <li className="tab col s2"><a href="#orders">Orders</a></li>
                        <li className="tab col s2"><a href="#favorites">Favorites</a></li>
                        <li className="tab col s2"><a href="#comments">Comments</a></li>
                        <li className="tab col s2"><a href="#ratings">Ratings</a></li>
                    </ul>
                </div>

                <div id="personal-data" className="col s12">

                    <ul className="collapsible">
                        <li className="active">
                            <div className="collapsible-header small-font-size"><i className="material-icons">account_circle</i>Basic information</div>
                            <div className="collapsible-body without-padding">
                                <BasicInfoSubTab/>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header small-font-size">
                                <i className="material-icons">vpn_key</i>
                                Change password
                            </div>
                            <div className="collapsible-body without-padding">
                                <ChangePassSubTab/>
                            </div>
                        </li>
                    </ul>


                </div>
                <div id="cart" className="col s12"><CartPage/></div>
                <div id="orders" className="col s12"><OrdersTab/></div>
                <div id="favorites" className="col s12">Favorites</div>
                <div id="comments" className="col s12"><CommentsTab/></div>
                <div id="ratings" className="col s12"><RatingsTab/></div>
            </div>
        </div>
    )
}
