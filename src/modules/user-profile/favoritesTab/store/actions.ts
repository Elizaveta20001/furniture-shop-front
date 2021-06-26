import {ActionTypes} from './actionTypes';

export const fetchUserFavorites = (userId: string, token: string) => {
    return {
        type: ActionTypes.FETCH_USER_FAVORITES_START,
        userId,
        token
    }
};

export const fetchUserFavoritesSuccess = (data: string) => {
    return({
        type: ActionTypes.FETCH_USER_FAVORITES_SUCCESS,
        payload: data
    })
};

export const fetchUserFavoritesFail = (error: Error) => {
    return({
        type: ActionTypes.FETCH_USER_FAVORITES_FAIL,
        payload: error.message
    })
};

export const addToUserFavorites = (id: number, userId: string, token: string) => {
    return {
        type: ActionTypes.ADD_TO_USER_FAVORITES_START,
        id,
        userId,
        token,
    }
};

export const addToUserFavoritesSuccess = (data: string) => {
    return({
        type: ActionTypes.ADD_TO_USER_FAVORITES_SUCCESS,
        payload: data
    })
};

export const addToUserFavoritesFail = (error: Error) => {
    return({
        type: ActionTypes.ADD_TO_USER_FAVORITES_FAIL,
        payload: error.message
    })
};

export const clearUserFavoritesMessage = () => ({type: ActionTypes.CLEAR_MESSAGE});

export const initUserFavoritesState = () => ({type: ActionTypes.INIT_STATE});

