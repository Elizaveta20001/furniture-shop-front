import {ActionTypes} from './actionTypes';

export const fetchUserRatings = (url: string, userId: string, token: string) => {
    return {
        type: ActionTypes.FETCH_USER_RATINGS_START,
        url,
        userId,
        token
    }
};

export const fetchUserRatingsSuccess = (data: string) => {
    return({
        type: ActionTypes.FETCH_USER_RATINGS_SUCCESS,
        payload: data
    })
};

export const fetchUserRatingsFail = (error: Error) => {
    return({
        type: ActionTypes.FETCH_USER_RATINGS_FAIL,
        payload: error.message
    })
};

export const clearUserRatingsMessage = () => ({type: ActionTypes.CLEAR_MESSAGE});

export const initUserRatingsState = () => ({type: ActionTypes.INIT_STATE});

