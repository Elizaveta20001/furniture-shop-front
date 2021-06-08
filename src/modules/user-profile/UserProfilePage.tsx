import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from '../../hooks/message.hook';

import {uriForUser} from "./constants";
import {fetchUserData, updateUserData} from "./store/actions";


import "./userProfilePage.css";
import DefaultImage from "../../assets/default-profile.png";
import {Loader} from "../../components/loader/Loader";
import {PersonalDataCard} from "../../components/personalDataCard/PersonalDataCard";
import {PersonalUserData} from "../../interfaces/interfaces";


export const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const userData  = useSelector((state: Store) => state.userDataReducer.userData);
    const isFetching  = useSelector((state: Store) => state.userDataReducer.isFetching);
    const isUpdating = useSelector((state: Store) => state.userDataReducer.isUpdating);
    const userError = useSelector((state: Store) => state.userDataReducer.userError);

    const defaultUserData: PersonalUserData = {
        email: '',
        firstName: '',
        lastName: '',
        image: undefined,
    };

    const stringifiedDefaultUserData = JSON.stringify(defaultUserData);
    const [stringifiedForm, setStringifiedForm] = useState('');
    const [form, setForm] = useState<PersonalUserData>(defaultUserData);
    const [dataToSend, setDataToSend] = useState<PersonalUserData>(defaultUserData);
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
        if (userData.image !== undefined) setImagePreview(userData.image)
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

    const cancelHandler = () => {
        setDataToSend(defaultUserData);
        setToggledChange(false);
    }

    return (
        <div>
            {isFetching || isUpdating ? <Loader/> : (
                <div>

                    <div className="card without-margin-top">

                        <PersonalDataCard
                            defaultValues={form}
                            values={dataToSend}
                            toggledChange={toggledChange}
                            changeHandler={changeHandler}
                            fileSelectorHandler={fileSelectorHandler}
                            imagePreview={imagePreview}
                            cancelHandler={cancelHandler}
                        />

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
