import { useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {uriForChangePass} from "../../constants";
import {updateUserPassword} from "../../store/actions";
import {ChangePassUserData} from "../../../../interfaces/interfaces";

import {Loader} from "../../../../components/loader/Loader";
import {ChangePassCard} from "../../../../components/changePassCard/ChangePassCard"

import "./changePassSubTab.css";

export const ChangePassSubTab: React.FC = () => {

    const fieldRefs:any = useRef();

    const emailRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const isUpdating = useSelector((state: Store) => state.userDataReducer.isUpdating);

    const defaultChangePassData: ChangePassUserData = {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    };

    const [data, setData] = useState<ChangePassUserData>(defaultChangePassData);
    const [toggledChange, setToggledChange] = useState(true);

    const registerField = (key:any, ref:any) => {
        fieldRefs.current = {...fieldRefs.current, [key]: ref}
    }

    const changeHandler = (event: any) => {
        setData({...data, [event.target.name]: event.target.value});

     }

    const submitHandler = (event: any) => {

        event.preventDefault();

        let oldPassword = fieldRefs.current.oldPassword.current;
        let newPassword = fieldRefs.current.newPassword.current;
        let repeatNewPassword = fieldRefs.current.repeatNewPassword.current;

        console.log('oldPassword',oldPassword.value);
        console.log('newPassword',newPassword.value);
        console.log('repeatNewPassword',repeatNewPassword.value);

        oldPassword.setCustomValidity('');
        oldPassword.reportValidity();

        newPassword.setCustomValidity('');
        newPassword.reportValidity();

        repeatNewPassword.setCustomValidity('');
        repeatNewPassword.reportValidity();

        if (
            !!newPassword.value && !!repeatNewPassword.value && !!oldPassword.value
        ) {

            if (!emailRegExp.test(oldPassword)) {
                oldPassword.setCustomValidity('');
                oldPassword.reportValidity();
            } else if (!emailRegExp.test(newPassword)) {
                newPassword.setCustomValidity('');
                newPassword.reportValidity();
            } else if (!emailRegExp.test(repeatNewPassword)) {
                repeatNewPassword.setCustomValidity('');
                repeatNewPassword.reportValidity();
            } else if (newPassword.value === oldPassword.value) {

                oldPassword.setCustomValidity('New and old passwords are the same!');
                oldPassword.reportValidity();

                newPassword.setCustomValidity('New and old passwords are the same!');
                newPassword.reportValidity();

            }
            else if (newPassword.value !== repeatNewPassword.value) {

                newPassword.setCustomValidity("New password not confirmed");
                newPassword.reportValidity();

                repeatNewPassword.setCustomValidity("New password not confirmed");
                repeatNewPassword.reportValidity();

            } else {
                {

                    let dataToSend = {
                        oldPassword: data.oldPassword,
                        newPassword: data.newPassword
                    }

                    try {
                        dispatch(updateUserPassword(uriForChangePass, 'PUT', dataToSend, userId, token));
                        cancelHandler();
                    }
                    catch(e) {
                        console.log('error on change user password:', e);
                    }

                }
            }
        }
    }

    const cancelHandler = () => {
        setData(defaultChangePassData);
        setToggledChange(false);
    }

    return (
        <div>
            {isUpdating ? <Loader/> : (
                <div>

                    <div className="card without-margin-vertical">
                        <form>
                            <ChangePassCard
                                values={data}
                                toggledChange={toggledChange}
                                changeHandler={changeHandler}
                                registerField={registerField}
                            />

                            <div className="card-action buttons-container">
                                {
                                    !toggledChange ? (
                                        <button
                                            className="waves-effect waves-light btn login-button"
                                            onClick={() => setToggledChange(true)}
                                        >
                                            Change password
                                        </button>
                                    ) : (
                                        <div>
                                            <button
                                                className="waves-effect waves-light btn unprior-button"
                                                onClick={cancelHandler}
                                            >
                                                Cancel Changes
                                            </button>
                                            <button
                                                className="waves-effect waves-light btn prior-button"
                                                onClick={submitHandler}
                                            >
                                                Confirm Changes
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
