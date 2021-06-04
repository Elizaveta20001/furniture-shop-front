import {ActionTypes} from './actionTypes';

export const fetchUserData = (url: string, userId: string) => {
    return {
        type: ActionTypes.FETCH_USER_DATA_START,
        url,
        userId
    }
};

export const fetchUserDataSuccess = (data: string)=>{
    return({
        type: ActionTypes.FETCH_USER_DATA_SUCCESS,
        payload: data
    })
};

export const fetchUserDataFail = (error: Error)=>{
    return({
        type: ActionTypes.FETCH_USER_DATA_FAIL,
        payload: error.message
    })
};

export const updateUserData = (url: string, userId: string, method: string, form: any) => {
    return {
        type: ActionTypes.UPDATE_USER_DATA_START,
        url,
        method,
        form,
        userId
    }
};

export const updateUserDataSuccess = (data: string)=>{
    return({
        type: ActionTypes.UPDATE_USER_DATA_SUCCESS,
        payload: data
    })
};

export const updateUserDataFail = (error: Error)=>{
    return({
        type: ActionTypes.UPDATE_USER_DATA_FAIL,
        payload: error.message
    })
};

