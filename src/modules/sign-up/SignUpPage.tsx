import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from '../../hooks/message.hook';

import {apiReg} from "./constants";
import {clearMessage, fetchRegin} from "../authorization/store/actions";


import "./signUpPage.css";


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
        setForm({
            ...form,
            image: event.target.files[0],
        });
        setImagePreview(URL.createObjectURL(event.target.files[0]));
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
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Sign Up</h1>
                <div className="card form-background">
                    <div className="card-content white-text">
                        <div>
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
                                <label htmlFor="first_name"></label>
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
                                <label htmlFor="last_name"></label>
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
                                <label htmlFor="email"></label>
                                <div className="helper-text" data-error="wrong" data-success="right"/>
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
                                <label htmlFor="password"></label>
                                <div className="helper-text" data-error="wrong" data-success="right"/>
                            </div>

                                <form action="">
                                    <div className="file-field input-field">
                                        <div className="btn file-selector">
                                            <span>File</span>
                                            <input type="file" accept="image/*" onChange={fileSelectorHandler} />
                                        </div>
                                        <div className="file-path-wrapper file-selector">
                                            <input className="file-path validate" type="text"/>
                                        </div>
                                        <div className="helper-text" data-error="wrong" data-success="right">
                                            Max image size - 10MB
                                        </div>
                                    </div>

                                </form>

                            {imagePreview && (
                                <div>
                                    <img className="preview" src={imagePreview} alt="" />
                                </div>
                            )}

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
        </div>
    )
}
