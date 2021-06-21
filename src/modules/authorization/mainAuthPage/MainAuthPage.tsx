import {  useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from "../../../hooks/message.hook";

import {clearMessage} from "../store/actions";
import {SignInPage} from "../sign-in/SignInPage";
import {SignUpPage} from "../sign-up/SignUpPage";
import {Loader} from "../../../components/loader/Loader";

import "./mainAuthPage.css";


export const MainAuthPage: React.FC = () => {
    const message = useMessage();
    const dispatch = useDispatch();
    const loginNotification = useSelector((state: Store) => state.loginReducer.message);
    const reginNotification = useSelector((state: Store) => state.reginReducer.message);
    let isUpToDate = useSelector((state: Store) => state.reginReducer.isUpToDate);

    useEffect(() => {
        message(loginNotification);

        return () => {
            dispatch(clearMessage());
        }

    }, [loginNotification, message])

    useEffect(() => {
        message(reginNotification);

        return () => {
            dispatch(clearMessage());
        }

    }, [reginNotification, message])

    useEffect(() => {
        window.M.updateTextFields();
        window.M.AutoInit();
        let collapsibleElems = document.querySelectorAll('.collapsible.expandable');
        window.M.Collapsible.init(collapsibleElems,{accordion: false});
    })



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
                    <div id="personal-data" className="col s12">
                        <SignInPage/>
                    </div>
                    <div id="cart" className="col s12">
                        {
                            isUpToDate ? <SignUpPage/> : <Loader/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
