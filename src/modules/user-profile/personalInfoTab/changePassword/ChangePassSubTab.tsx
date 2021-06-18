import { useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {uriForChangePass} from "../../constants";
import {updateUserPassword} from "../store/actions";
import {setFieldError} from "../../../../helpers/setFieldError";
import {passRequirements, passRegExp} from "../../../../helpers/validation";
import {ChangePassUserData} from "../../../../interfaces/interfaces";

import {Loader} from "../../../../components/loader/Loader";
import {ChangePassCard} from "../../../../components/changePassCard/ChangePassCard"

import "./changePassSubTab.css";

export const ChangePassSubTab: React.FC = () => {

    const fieldRefs:any = useRef();

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const isUpdating = useSelector((state: Store) => state.userReducer.userDataReducer.isUpdating);

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

     const validateForm = (oldPassword:any, newPassword:any, repeatNewPassword:any): boolean => {

        setFieldError(oldPassword,'');
        setFieldError(newPassword,'');
        setFieldError(repeatNewPassword,'');

        if (!oldPassword.value) {
            setFieldError(oldPassword, 'This field is required');
            return false;
        }
         if (!newPassword.value) {
             setFieldError(newPassword, 'This field is required');
             return false;
         }
         if (!repeatNewPassword.value) {
             setFieldError(repeatNewPassword, 'This field is required');
             return false;
         }

        if (!passRegExp.test(newPassword.value)) {
            setFieldError(newPassword, passRequirements)
            return false;
        }
        if (!passRegExp.test(repeatNewPassword.value)) {
            setFieldError(repeatNewPassword, passRequirements);
            return false;
        }

         if (newPassword.value === oldPassword.value) {
             setFieldError(oldPassword,'New and old passwords are the same!');
             setFieldError(newPassword,'New and old passwords are the same!');
             return false;
         }

         if (newPassword.value !== repeatNewPassword.value) {
             setFieldError(newPassword,"New password not confirmed");
             setFieldError(repeatNewPassword,"New password not confirmed");
             return false;
         }

        return true;

     }

    const submitHandler = (event: any) => {

        event.preventDefault();

        let oldPassword = fieldRefs.current.oldPassword.current;
        let newPassword = fieldRefs.current.newPassword.current;
        let repeatNewPassword = fieldRefs.current.repeatNewPassword.current;

        if (validateForm(oldPassword, newPassword, repeatNewPassword)) {
            let dataToSend = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }
            dispatch(updateUserPassword(uriForChangePass, 'PUT', dataToSend, userId, token));
            cancelHandler();
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
