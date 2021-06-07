import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useMessage } from '../../hooks/message.hook';

import {apiReg} from "./constants";
import {clearMessage, fetchRegin} from "../authorization/store/actions";
import {PersonalUserData} from "../../interfaces/interfaces";

import {PersonalDataCard} from "../../components/personalDataCard/PersonalDataCard";

import "./signUpPage.css";



export const SignUpPage: React.FC = () => {
    const dispatch = useDispatch();
    const message = useMessage();
    const err = useSelector((state: Store) => state.loginReducer.message);

    const defaultUserData: PersonalUserData = {
        email: '',
        firstName: '',
        lastName: '',
        image: undefined,
        password: ''
    };
    const [form, setForm] = useState<PersonalUserData>(defaultUserData);

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
        <div className="card">
            <PersonalDataCard
                values={form}
                toggledChange
                changeHandler={changeHandler}
                fileSelectorHandler={fileSelectorHandler}
                imagePreview={imagePreview}
            />

            <div className="input-field sign-up">
                Password:
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
            </div>

            <div className="card-action">
                <button
                    className="waves-effect waves-light btn login-button"
                    onClick={submitHandler}
                >
                    Sign up
                </button>
            </div>

        </div>
    )
}
