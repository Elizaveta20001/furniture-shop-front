import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from "../../../hooks/message.hook";
import {useHistory} from "react-router-dom";

import { apiLogin } from "../constants";
import { fetchLogin, enter, clearMessage } from "../store/actions";

import "./mainAuthPage.css";
import {SignInPage} from "../sign-in/SignInPage";
import {SignUpPage} from "../sign-up/SignUpPage";
import {ChangePassSubTab} from "../../user-profile/personalInfoTab/changePassword/ChangePassSubTab";


export const MainAuthPage: React.FC = () => {
    const dispatch = useDispatch();
    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(err);
    }, [
        err,
        message,
    ])

    useEffect(() => {
        window.M.updateTextFields();
        window.M.AutoInit();
    }, [])


    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const login = () => {
        try {
            dispatch(fetchLogin(apiLogin, 'POST', form, {}));
            dispatch(enter(false));
            dispatch(clearMessage());
        } catch(e){}
    }

    return (
        <div className="row">
            <div className="col s10 offset-s1">
                <h1>Authorization</h1>
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s3"><a href="#personal-data">Sign In</a></li>
                            <li className="tab col s3"><a href="#cart">Sign Up</a></li>
                        </ul>
                    </div>
                    <div id="personal-data" className="col s12"><SignInPage/></div>
                    <div id="cart" className="col s12">
                        <ul className="collapsible">
                            <li className="active">
                                <div className="collapsible-header small-font-size"><i className="material-icons">account_circle</i>Basic information</div>
                                <div className="collapsible-body without-padding">
                                    <SignUpPage/>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header small-font-size">
                                    <i className="material-icons">vpn_key</i>
                                    Password
                                </div>
                                <div className="collapsible-body without-padding">
                                    <ChangePassSubTab/>
                                </div>
                            </li>
                        </ul>


                    </div>
                </div>
            </div>
        </div>
    )
}
