import { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";

import {apiReg} from "../constants";
import {clearMessage, fetchRegin} from "../store/actions";
import {PersonalUserData, UserPassData} from "../../../interfaces/interfaces";

import {PersonalDataCard} from "../../../components/personalDataCard/PersonalDataCard";
import {SetPassCard} from "../../../components/setPassCard/SetPassCard";

import "./signUpPage.css";


export const SignUpPage: React.FC = () => {
    const dispatch = useDispatch();

    const defaultUserData: PersonalUserData = {
        email: '',
        firstName: '',
        lastName: '',
        image: undefined,
    };

    const defaultUserPassData: UserPassData = {
        signUpPassword: '',
        repeatSignUpPassword: ''
    };

    const [form, setForm] = useState<PersonalUserData>(defaultUserData);
    const [pass, setPass] = useState<UserPassData>(defaultUserPassData);

    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeDataHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const changePassHandler = (event: any) => {
        setPass({...pass, [event.target.name]: event.target.value});
    }

    const blurPassHandler = (event: any) => {
        if (!!pass.signUpPassword && !!pass.repeatSignUpPassword) {
            if (pass.signUpPassword === pass.repeatSignUpPassword) console.log("pass != repeatPass");
        }
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

        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);

        formData.append("password", pass.signUpPassword);

        try {
            dispatch(fetchRegin(apiReg, 'POST', formData, {}));
            dispatch(clearMessage());
        } catch(e){}
    }

    return (
        <div className="card">

            <ul className="collapsible without-margin-vertical">
                <li className="active">
                    <div className="collapsible-header small-font-size"><i className="material-icons">account_circle</i>Basic information</div>
                    <div className="collapsible-body without-padding">
                        <PersonalDataCard
                            values={form}
                            toggledChange
                            changeHandler={changeDataHandler}
                            fileSelectorHandler={fileSelectorHandler}
                            imagePreview={imagePreview}
                        />
                    </div>
                </li>
                <li>
                    <div className="collapsible-header small-font-size">
                        <i className="material-icons">vpn_key</i>
                        Password
                    </div>
                    <div className="collapsible-body without-padding">
                        <SetPassCard
                            values={pass}
                            changeHandler={changePassHandler}
                            blurHandler={blurPassHandler}
                        />
                    </div>
                </li>
            </ul>

            <div className="card-action buttons-container">
                <button
                    className="waves-effect waves-light btn prior-button"
                    onClick={submitHandler}
                >
                    Sign up
                </button>
            </div>

        </div>
    )
}
