import { ENTER, LOGOUT, SET_LOGIN, ERROR, CLEAR_MESSAGE } from './keys';

interface LoginState {
    token: string;
    userId: string;
    isEnter: boolean;
    message: string;
}

interface Payload {
    token: string;
    userId: string;
    errors: Array<any>;
    message: string;

}

interface Form {
    email: string;
    password: string;
}

interface Headers {
    token?: string;
    userId?: string;
}

interface Action {
    type: string;
    url: string;
    method: string;
    payload: Payload;
    flag: boolean;
    form: Form;
    headers: Headers;
    token: string;
    userId: string;
}

const defaultState: LoginState = {
    token: '',
    userId: '',
    message: '',
    isEnter: false
}

export default function loginReducer(state = defaultState, action: Action) {
    switch(action.type) {
        case SET_LOGIN:
            localStorage.setItem('userData', JSON.stringify({
                userId: action.payload.userId,
                token: action.payload.token,
            }));

            localStorage.setItem('isEnter', JSON.stringify({
                isEnter: state.isEnter
            }));

            return {
                ...state, 
                message: 'conected',
                token: action.payload.token,
                userId: action.payload.userId,
            };
        case LOGOUT:
            return {
                ...defaultState, 
                message: 'logout',
                isEnter:false
            };
        case ENTER:
            return {
                ...state, 
                isEnter: action.flag
            };
        case ERROR:
            return {
                ...state, 
                message: action.payload.message,
            };
        case CLEAR_MESSAGE:
            return {
                ...state, 
                message: '',
            };
    };
    return state;
};
