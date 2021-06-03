import {ENTER, ERROR, FETCH_LOGIN, FETCH_REGIN, LOGOUT, SET_LOGIN, CLEAR_MESSAGE} from './keys';

interface Form {
    email: string;
    password: string;

}

interface Payload {
    token: string;
    userId: string;
}

interface Headers {
    token?: string;
    userId?: string;
    'content-type'?: string;
}

export const setLogin = (payload: Payload) => ({type: SET_LOGIN, payload});
export const clearMessage = () => ({type: CLEAR_MESSAGE});
export const enter = (flag: boolean) => ({type: ENTER, flag});
export const logout = () => ({type: LOGOUT});
export const error = (payload: Payload) => ({type: ERROR, payload});


export const fetchLogin = (url: string, method: string, form: Form, headers: Headers) => {
    return {
        type: FETCH_LOGIN,
        url,
        method,
        form,
        headers
    }
};

export const fetchRegin = (url: string, method: string, form: any, headers: Headers) => {
    return {
        type: FETCH_REGIN,
        url,
        method,
        form,
        headers
    }
};
