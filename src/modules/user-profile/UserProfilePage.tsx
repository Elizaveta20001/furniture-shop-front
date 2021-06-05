import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from '../../hooks/message.hook';

import {uriForUser} from "./constants";
import {fetchUserData, updateUserData} from "./store/actions";


import "./userProfilePage.css";
import DefaultImage from "../../assets/default-profile.png";
import {Loader} from "../../components/loader/Loader";


export const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const userData  = useSelector((state: Store) => state.userDataReducer.userData);
    const isFetching  = useSelector((state: Store) => state.userDataReducer.isFetching);
    const isUpdating = useSelector((state: Store) => state.userDataReducer.isUpdating);
    const userError = useSelector((state: Store) => state.userDataReducer.userError);

    const defaultUserData = {
        email: '',
        firstName: '',
        lastName: '',
        image: undefined,
    };

    const stringifiedDefaultUserData = JSON.stringify(defaultUserData);
    const [stringifiedForm, setStringifiedForm] = useState('');
    const [form, setForm] = useState(defaultUserData);
    const [dataToSend, setDataToSend] = useState(defaultUserData);
    const [imagePreview, setImagePreview] = useState('');
    const [toggledChange, setToggledChange] = useState(false);

    useEffect(() => {
        message(err);
    }, [
        err,
        message,
    ])

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    useEffect(() => {
        dispatch(fetchUserData(uriForUser, userId));
    }, [dispatch, userId])

    useEffect(() => {
        setForm({...userData});
        setStringifiedForm(JSON.stringify(form));
        if (!userData.image === undefined) setImagePreview(userData.image)
        else setImagePreview(DefaultImage);
        setDataToSend({
            email: '',
            firstName: '',
            lastName: '',
            image: undefined,
        });
    }, [userData])

    const changeHandler = (event: any) => {
        setDataToSend({...dataToSend, [event.target.name]: event.target.value});
    }

    const fileSelectorHandler = (event: any) => {
        if (!!event.target.files[0]) {
            setDataToSend({
                ...dataToSend,
                image: event.target.files[0],
            });
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
        else setImagePreview(DefaultImage);
    }

    const submitHandler = () => {
        const stringifiedDataToSend = JSON.stringify(dataToSend);

        if (stringifiedDataToSend !== stringifiedDefaultUserData && stringifiedDataToSend !== stringifiedForm) {
            console.log('dataToSend',dataToSend);

            let formData:any = new FormData();

            formData.append("image", dataToSend.image);
            formData.append("email", dataToSend.email);
            formData.append("firstName", dataToSend.firstName);
            formData.append("lastName", dataToSend.lastName);

            try {
                dispatch(updateUserData(uriForUser, userId, 'PUT', formData));
            }
            catch(e) {
                console.log('error on userData update:', e);
            }
        }
        setToggledChange(false);
    }

    return (
        <div>
            {isFetching || isUpdating ? <Loader/> : (
                <div>
                    <div className="card">
                        <div className="row image-column-container">
                            <div className="col s12 m5">
                                <div className="card-content">
                                    <form className="image-container" action="#" >
                                        <div className="file-field input-field">
                                            <div className="preview">
                                                <img className="circle" src={imagePreview || DefaultImage} alt="" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={fileSelectorHandler}
                                                    disabled={!toggledChange}
                                                />
                                                <input
                                                    className="file-path validate file-selector"
                                                    type="text"
                                                    placeholder="set new profile image"
                                                    disabled
                                                />
                                                <div className="helper-text" data-error="wrong" data-success="right">
                                                    Max image size - 10MB
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col s12 m7">
                                <div className="card-content">
                                    <div className="form-container">
                                        <div className="input-field with-current-data">
                                            <div className="input-field-with-note">
                                                First name:
                                                <input
                                                    placeholder={form.firstName || "enter new first name"}
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    className="validate"
                                                    pattern="[A-Za-z]{1,32}"
                                                    value={dataToSend.firstName}
                                                    onChange={changeHandler}
                                                    disabled={!toggledChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="input-field with-current-data">
                                            <div className="input-field-with-note">
                                                Last name:
                                                <input
                                                    placeholder={form.lastName || "enter new last name"}
                                                    id="lastName"
                                                    name="lastName"
                                                    type="text"
                                                    className="validate"
                                                    pattern="[A-Za-z]{1,32}"
                                                    value={dataToSend.lastName}
                                                    onChange={changeHandler}
                                                    disabled={!toggledChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="input-field">
                                            <div className="input-field-with-note">
                                                E-mail:
                                                <div>
                                                    <input
                                                        placeholder={form.email || "enter new email"}
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        className="validate"
                                                        value={dataToSend.email}
                                                        onChange={changeHandler}
                                                        disabled={!toggledChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-action buttons-container">
                            {
                                !toggledChange ? (
                                    <button
                                        className="waves-effect waves-light btn login-button"
                                        onClick={() => setToggledChange(true)}
                                    >
                                        Change data
                                    </button>
                                ) : (
                                    <button
                                        className="waves-effect waves-light btn login-button"
                                        onClick={submitHandler}
                                    >
                                        Confirm Changes
                                    </button>
                                )
                            }

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
