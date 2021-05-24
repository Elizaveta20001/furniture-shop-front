import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from '../../hooks/message.hook';

import { apiLogin, apiReg } from './constants';
import { fetchLogin, enter, fetchRegin, clearMessage } from './store/actions';

import "./authPage.css";


export const AuthPage: React.FC = () => {
    const dispatch = useDispatch();
    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

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

    const registaration = () => {
        try {
            dispatch(fetchRegin(apiReg, 'POST', form, {}));
            dispatch(clearMessage());
        } catch(e){}
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
            <div className="col s6 offset-s3">
                <h1>Authorization</h1>
                <div className="card form-background">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="enter email" 
                                    id="email" 
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange = {changeHandler}
                                    required
                                />
                                <label htmlFor="email"></label>
                            </div>

                            <div className="input-field">
                                <input 
                                    placeholder="enter password" 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    value={form.password}
                                    onChange = {changeHandler}
                                    required
                                />
                                <label htmlFor="password"></label>
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
                        <button 
                            className="waves-effect waves-light btn reg-button"
                            onClick={registaration}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    )
}