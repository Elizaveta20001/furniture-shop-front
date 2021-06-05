import "./mainUserProfilePage.css";
import {useEffect} from "react";
import {UserProfilePage} from "../UserProfilePage";
import {CartPage} from "../../cart/CartPage";


export const MainUserProfilePage: React.FC = () => {

    useEffect( () => {
        window.M.AutoInit();
    }, [])


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
                <div id="personal-data" className="col s12"><UserProfilePage/></div>
                <div id="cart" className="col s12"><CartPage/></div>

                <div id="orders" className="col s12">Orders history</div>
                <div id="comments-ratings" className="col s12">Comments & ratings</div>
            </div>
        </div>
    )
}
