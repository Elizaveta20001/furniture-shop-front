import { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";

import { apiLogin } from '../constants';
import {fetchLogin, enter, clearMessage} from '../store/actions';

import "./signInPage.css";



export const SignInPage: React.FC = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        signInEmail: '',
        signInPassword: ''
    })

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const login = (event:any) => {

        event.preventDefault();

        try {
            dispatch(
                fetchLogin(
                    apiLogin,
                    'POST',
                    {
                            email: form.signInEmail,
                            password: form.signInPassword
                         },
                    {}
                )
            );
            dispatch(enter(false));
            dispatch(clearMessage());
        } catch(e){}
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card form-background">
                    <form onSubmit={login}>
                        <div className="card-content">
                            <div>
                                <div className="input-field sign-in">
                                    E-mail:
                                    <input
                                        placeholder="enter email"
                                        id="signInEmail"
                                        name="signInEmail"
                                        type="email"
                                        className="validate"
                                        pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
                                        value={form.signInEmail}
                                        onChange={changeHandler}
                                        required
                                    />
                                </div>

                                <div className="input-field sign-in">
                                    Password:
                                    <input
                                        placeholder="enter password"
                                        id="signInPassword"
                                        type="password"
                                        name="signInPassword"
                                        className="validate"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                                        value={form.signInPassword}
                                        onChange = {changeHandler}
                                        required
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="card-action">
                            <button
                                className="waves-effect waves-light btn login-button"
                                style={{marginRight:10}}
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
