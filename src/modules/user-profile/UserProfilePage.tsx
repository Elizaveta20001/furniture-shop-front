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


    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        image: undefined,
    });

    const [dataToSend, setDataToSend] = useState({
        email: '',
        firstName: '',
        lastName: '',
        image: undefined,
    });

    const [imagePreview, setImagePreview] = useState('');

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

    return (
        <div>
            {isFetching || isUpdating ? <Loader/> : (
                <div>
                    <h1>My Profile</h1>
                    <div className="card form-background">
                        <div className="row image-column-container">
                            <div className="col s12 m5">
                                <div className="card-content">
                                    <form className="image-container" action="#" >
                                        <div className="file-field input-field">
                                            <div className="preview">
                                                <img className="circle" src={imagePreview || DefaultImage} alt="" />
                                                <input type="file" accept="image/*" onChange={fileSelectorHandler} />
                                                <input
                                                    className="file-path validate file-selector"
                                                    type="text"
                                                    placeholder="set new profile image"
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
                                            First name: {form.firstName}
                                            <input
                                                placeholder="enter new first name"
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                className="validate"
                                                pattern="[A-Za-z]{1,32}"
                                                value={dataToSend.firstName}
                                                onChange = {changeHandler}
                                                required
                                            />
                                            <div className="helper-text" data-error="wrong" data-success="right"/>
                                        </div>

                                        <div className="input-field with-current-data">
                                            Last name: {form.lastName}
                                            <input
                                                placeholder="enter new last name"
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                className="validate"
                                                pattern="[A-Za-z]{1,32}"
                                                value={dataToSend.lastName}
                                                onChange = {changeHandler}
                                                required
                                            />
                                            <div className="helper-text" data-error="wrong" data-success="right"/>
                                        </div>

                                        <div className="input-field with-current-data">
                                            E-mail: {form.email}
                                            <input
                                                placeholder="enter new email"
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="validate"
                                                value={dataToSend.email}
                                                onChange = {changeHandler}
                                                required
                                            />
                                            <div className="helper-text" data-error="wrong" data-success="right"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="waves-effect waves-light btn login-button"
                                style={{marginRight:10}}
                                onClick={submitHandler}
                            >
                                Confirm Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
