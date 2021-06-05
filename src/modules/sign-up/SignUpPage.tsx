import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from '../../hooks/message.hook';

import {apiReg} from "./constants";
import {clearMessage, fetchRegin} from "../authorization/store/actions";


import "./signUpPage.css";
import DefaultImage from "../../assets/default-profile.png";


export const SignUpPage: React.FC = () => {
    const dispatch = useDispatch();
    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        image: undefined,
    })
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

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const fileSelectorHandler = (event: any) => {
        if (!!event.target.files[0]) {
            setForm({
                ...form,
                image: event.target.files[0],
            });
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    const submitHandler = () => {

        let formData:any = new FormData();

        formData.append("image", form.image);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);

        try {
            dispatch(fetchRegin(apiReg, 'POST', formData, {}));
            dispatch(clearMessage());
        } catch(e){}
    }

    return (
        <div>
            <div className="card form-background">
                <div className="row image-column-container">
                    <div className="col s12 m5">
                        <div className="card-content">
                            <form className="image-container" action="" >
                                <div className="file-field input-field">
                                    <div className="preview">
                                        <img className="circle" src={imagePreview || DefaultImage} alt="" />
                                        <input type="file" accept="image/*" onChange={fileSelectorHandler} />
                                        <input className="file-path validate file-selector" type="text"/>
                                    </div>
                                    <div className="helper-text" data-error="wrong" data-success="right">
                                        Max image size - 10MB
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col s12 m7">
                        <div className="card-content">
                            <div className="form-container">
                                <div className="input-field">
                                    <input
                                        placeholder="enter first name"
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        className="validate"
                                        pattern="[A-Za-z]{1,32}"
                                        value={form.firstName}
                                        onChange = {changeHandler}
                                        required
                                    />
                                    <label htmlFor="first_name">First Name</label>
                                    <div className="helper-text" data-error="wrong" data-success="right"/>
                                </div>

                                <div className="input-field">
                                    <input
                                        placeholder="enter last name"
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        className="validate"
                                        pattern="[A-Za-z]{1,32}"
                                        value={form.lastName}
                                        onChange = {changeHandler}
                                        required
                                    />
                                    <label htmlFor="last_name">Last Name</label>
                                    <div className="helper-text" data-error="wrong" data-success="right"/>
                                </div>

                                <div className="input-field">
                                    <input
                                        placeholder="enter email"
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="validate"
                                        value={form.email}
                                        onChange = {changeHandler}
                                        required
                                    />
                                    <div className="helper-text" data-error="wrong" data-success="right"/>
                                    <label htmlFor="email">E-mail</label>

                                </div>

                                <div className="input-field">
                                    <input
                                        placeholder="enter password"
                                        id="password"
                                        type="password"
                                        className="validate"
                                        name="password"
                                        value={form.password}
                                        onChange = {changeHandler}
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
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
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}
