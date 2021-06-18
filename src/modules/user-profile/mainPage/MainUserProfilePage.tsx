import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useMessage} from "../../../hooks/message.hook";

import {BasicInfoSubTab} from "../personalInfoTab/basicInformation/BasicInfoSubTab";
import {CartPage} from "../../cart/CartPage";

import {ChangePassSubTab} from "../personalInfoTab/changePassword/ChangePassSubTab";

import "./mainUserProfilePage.css";


export const MainUserProfilePage: React.FC = () => {

    const message = useMessage();
    const notification = useSelector((state: Store) => state.userDataReducer.message);

    useEffect( () => {
        let tabsElems = document.querySelectorAll('.tabs');
        let collapsibleElems = document.querySelectorAll('.collapsible');
        window.M.Tabs.init(tabsElems);
        window.M.Collapsible.init(collapsibleElems);
    }, [])

    useEffect(() => {
        message(notification);
    }, [notification,message])


    return (
        <div>
            <h1>My Profile</h1>

            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a href="#personal-data">Personal data</a></li>
                        <li className="tab col s3"><a href="#cart">Cart</a></li>
                        <li className="tab col s3"><a href="#orders">Orders</a></li>
                        <li className="tab col s3"><a href="#comments-ratings">Comments & Ratings</a></li>
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

                <div id="orders" className="col s12">Orders history</div>
                <div id="comments-ratings" className="col s12">Comments & ratings</div>
            </div>
        </div>
    )
}
