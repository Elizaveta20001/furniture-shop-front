import {ActionTypes} from './actionTypes';

export const fetchUserData = (url: string, userId: string, token: string) => {
    return {
        type: ActionTypes.FETCH_USER_DATA_START,
        url,
        userId,
        token
    }
};

export const fetchUserDataSuccess = (data: string) => {
    return({
        type: ActionTypes.FETCH_USER_DATA_SUCCESS,
        payload: data
    })
};

export const fetchUserDataFail = (error: Error) => {
    return({
        type: ActionTypes.FETCH_USER_DATA_FAIL,
        payload: error.message
    })
};

export const updateUserData = (url: string, method: string, form: any, userId: string, token: string) => {
    return {
        type: ActionTypes.UPDATE_USER_DATA_START,
        url,
        method,
        form,
        userId,
        token
    }
};

export const updateUserDataSuccess = (data: string) => {
    return({
        type: ActionTypes.UPDATE_USER_DATA_SUCCESS,
        payload: data
    })
};

export const updateUserDataFail = (error: Error) => {
    return({
        type: ActionTypes.UPDATE_USER_DATA_FAIL,
        payload: error.message
    })
};

export const updateUserPassword = (url: string, method: string, form: any, userId: string, token: string) => {
    return {
        type: ActionTypes.UPDATE_USER_PASSWORD_START,
        url,
        method,
        form,
        userId,
        token
    }
};

export const updateUserPasswordSuccess = () => {
    return({
        type: ActionTypes.UPDATE_USER_PASSWORD_SUCCESS,
    })
};

export const updateUserPasswordFail = (error: Error) => {
    return({
        type: ActionTypes.UPDATE_USER_PASSWORD_FAIL,
        payload: error.message
    })
};

export const clearMessage = () => ({type: ActionTypes.CLEAR_MESSAGE});
