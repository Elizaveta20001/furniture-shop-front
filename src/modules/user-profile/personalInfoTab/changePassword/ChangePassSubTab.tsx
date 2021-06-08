import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {uriForChangePass} from "../../constants";
import {updateUserPassword} from "../../store/actions";
import {ChangePassUserData} from "../../../../interfaces/interfaces";

import {Loader} from "../../../../components/loader/Loader";
import {ChangePassCard} from "../../../../components/changePassCard/ChangePassCard"

import "./changePassSubTab.css";



export const ChangePassSubTab: React.FC = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const isUpdating = useSelector((state: Store) => state.userDataReducer.isUpdating);
    const userError = useSelector((state: Store) => state.userDataReducer.userError);

    const defaultChangePassData: ChangePassUserData = {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    };

    const stringifiedDefaultUserData = JSON.stringify(defaultChangePassData);
    const [data, setData] = useState<ChangePassUserData>(defaultChangePassData);
    const [toggledChange, setToggledChange] = useState(true);

    const changeHandler = (event: any) => {
        setData({...data, [event.target.name]: event.target.value});
    }

    const submitHandler = () => {

        if (
            !!data.newPassword && !!data.oldPassword && !!data.repeatNewPassword
        ) {
            if (data.newPassword === data.repeatNewPassword) {

                let dataToSend = {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword
                }

                try {
                    dispatch(updateUserPassword(uriForChangePass, userId, 'PUT', dataToSend, {}));
                    setToggledChange(false);
                }
                catch(e) {
                    console.log('error on change user password:', e);
                }

            }
            else {
                console.log('Passwords doesn\'t compare');
            }
        }
        else {
            console.log('empty data');
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

                        <ChangePassCard
                            values={data}
                            toggledChange={toggledChange}
                            changeHandler={changeHandler}
                            cancelHandler={cancelHandler}
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
                    </div>
                </div>
            )}
        </div>
    )
}
