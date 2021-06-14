import { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";

import { apiLogin } from '../constants';
import { fetchLogin, enter, clearMessage } from '../store/actions';

import "./signInPage.css";



export const SignInPage: React.FC = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const login = () => {
        try {
            dispatch(fetchLogin(apiLogin, 'POST', form, {}));
            dispatch(enter(false));
            dispatch(clearMessage());
        } catch(e){}
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card form-background">
                    <div className="card-content">
                        <div>
                            <div className="input-field sign-in">
                                E-mail:
                                <input
                                    placeholder="enter email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>

                            <div className="input-field sign-in">
                                Password:
                                <input
                                    placeholder="enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
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
                            onClick={login}
                        >
                            Sign in
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}