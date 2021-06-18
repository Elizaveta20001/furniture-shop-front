import {ActionTypes} from './actionTypes';

export const fetchUserComments = (url: string, userId: string, token: string) => {
    return {
        type: ActionTypes.FETCH_USER_COMMENTS_START,
        url,
        userId,
        token
    }
};

export const fetchUserCommentsSuccess = (data: string) => {
    return({
        type: ActionTypes.FETCH_USER_COMMENTS_SUCCESS,
        payload: data
    })
};

export const fetchUserCommentsFail = (error: Error) => {
    return({
        type: ActionTypes.FETCH_USER_COMMENTS_FAIL,
        payload: error.message
    })
};

export const clearUserCommentsMessage = () => ({type: ActionTypes.CLEAR_MESSAGE});
