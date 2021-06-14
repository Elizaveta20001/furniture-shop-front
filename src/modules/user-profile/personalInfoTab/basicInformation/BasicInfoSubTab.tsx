import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {uriForUser} from "../../constants";
import {fetchUserData, updateUserData, clearMessage} from "../../store/actions";


import "./basicInfoSubTab.css";
import DefaultImage from "../../../../assets/default-profile.png";
import {Loader} from "../../../../components/loader/Loader";
import {PersonalDataCard} from "../../../../components/personalDataCard/PersonalDataCard";
import {PersonalUserData} from "../../../../interfaces/interfaces";


export const BasicInfoSubTab: React.FC = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userData  = useSelector((state: Store) => state.userDataReducer.userData);
    const isFetching  = useSelector((state: Store) => state.userDataReducer.isFetching);
    const isUpdating = useSelector((state: Store) => state.userDataReducer.isUpdating);

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
        window.M.updateTextFields();

    }, [])

    useEffect(() => {
        dispatch(fetchUserData(uriForUser, userId, token));
    }, [dispatch, userId, token])

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

            dataToSend.image ? formData.append("image", dataToSend.image) : formData.append("image", form.image);
            dataToSend.email ? formData.append("email", dataToSend.email) : formData.append("email", form.email);
            dataToSend.firstName ? formData.append("firstName", dataToSend.firstName) : formData.append("firstName", form.firstName);
            dataToSend.lastName ? formData.append("lastName", dataToSend.lastName) : formData.append("lastName", form.lastName);

            try {
                dispatch(updateUserData(uriForUser, 'PUT', formData, userId, token));
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
