import {useState, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";

import {apiReg} from "../constants";
import {clearMessage, fetchRegin} from "../store/actions";
import {setFieldError} from "../../../helpers/setFieldError";
import {emailRegExp, nameRegExp ,passRegExp, passRequirements} from "../../../helpers/validation";
import {PersonalUserData, UserPassData} from "../../../interfaces/interfaces";

import {PersonalDataCard} from "../../../components/personalDataCard/PersonalDataCard";
import {SetPassCard} from "../../../components/setPassCard/SetPassCard";

import "./signUpPage.css";


export const SignUpPage: React.FC = () => {

    const fieldRefs:any = useRef();
    const dispatch = useDispatch();

    const defaultUserData: PersonalUserData = {
        email: '',
        firstName: '',
        lastName: '',
        image: undefined,
    };

    const defaultUserPassData: UserPassData = {
        password: '',
        repeatPassword: ''
    };

    const [form, setForm] = useState<PersonalUserData>(defaultUserData);
    const [pass, setPass] = useState<UserPassData>(defaultUserPassData);

    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const openSignUpSubTab = (tab: number) => {
        let instance = window.M.Collapsible.getInstance(document.querySelector('.collapsible.expandable'));
        instance.open(tab);
    }

    const registerField = (key:any, ref:any) => {
        fieldRefs.current = {...fieldRefs.current, [key]: ref}
    }

    const changeDataHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const changePassHandler = (event: any) => {
        setPass({...pass, [event.target.name]: event.target.value});
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

    const resetPassFormErrors = () => {

        let repeatPassword = fieldRefs.current.repeatPassword.current;
        let password = fieldRefs.current.password.current;
        setFieldError(password,'');
        setFieldError(repeatPassword,'');

    }

    const validatePassForm = (repeatSignUpPassword:any, signUpPassword:any): boolean => {

        if (!signUpPassword.value) {
            openSignUpSubTab(1);
            setFieldError(signUpPassword, 'This field is required');
            return false;
        }
        if (!repeatSignUpPassword.value) {
            openSignUpSubTab(1);
            setFieldError(repeatSignUpPassword, 'This field is required');
            return false;
        }

        if (!passRegExp.test(signUpPassword.value)) {
            openSignUpSubTab(1);
            setFieldError(signUpPassword, passRequirements)
            return false;
        }
        if (!passRegExp.test(repeatSignUpPassword.value)) {
            openSignUpSubTab(1);
            setFieldError(repeatSignUpPassword, passRequirements);
            return false;
        }

        if (signUpPassword.value !== repeatSignUpPassword.value) {
            openSignUpSubTab(1);
            setFieldError(signUpPassword,"New password not confirmed");
            setFieldError(repeatSignUpPassword,"New password not confirmed");
            return false;
        }

        return true;

    }

    const validateDataForm = (): boolean => {

        if (!validateField(form.firstName, nameRegExp)
            || !validateField(form.lastName, nameRegExp)
            || !validateField(form.email, emailRegExp)) {
            return false;
        }
        return true;

    }

    const validateField = (field: string, regExp: RegExp): boolean => {

        if (!field) return false;
        if (!regExp.test(field)) return false;
        return true;

    }

    const submitHandler = (event: any) => {

        event.preventDefault();

        let repeatSignUpPassword = fieldRefs.current.repeatPassword.current;
        let signUpPassword = fieldRefs.current.password.current;



        if (validatePassForm(signUpPassword, repeatSignUpPassword)) {

            let formData:any = new FormData();

            formData.append("image", form.image);
            formData.append("email", form.email);
            formData.append("firstName", form.firstName);
            formData.append("lastName", form.lastName);
            formData.append("password", pass.password);

            dispatch(fetchRegin(apiReg, 'POST', formData, {}));
            dispatch(clearMessage());
            setPass(defaultUserPassData);
            setForm(defaultUserData);

        }

    }

    const handleSignUpClick = () => {

        resetPassFormErrors();

        let repeatSignUpPassword = fieldRefs.current.repeatPassword.current;
        let signUpPassword = fieldRefs.current.password.current;

        if (!validatePassForm(signUpPassword, repeatSignUpPassword)) openSignUpSubTab(1)
        if (!validateDataForm()) openSignUpSubTab(0)

    }

    return (
        <div className="card">

            <form onSubmit={submitHandler}>

                <ul className="collapsible expandable without-margin-vertical">
                    <li className="active">
                        <div className="collapsible-header small-font-size"><i className="material-icons">account_circle</i>Basic information</div>
                        <div className="collapsible-body without-padding">
                            <PersonalDataCard
                                values={form}
                                toggledChange
                                changeHandler={changeDataHandler}
                                fileSelectorHandler={fileSelectorHandler}
                                imagePreview={imagePreview}
                                required={true}
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
                                registerField={registerField}
                            />
                        </div>
                    </li>
                </ul>

                <div className="card-action buttons-container">
                    <button
                        className="waves-effect waves-light btn prior-button"
                        type="submit"
                        onClick={handleSignUpClick}
                    >
                        Sign up
                    </button>
                </div>

            </form>

        </div>
    )
}
