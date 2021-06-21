import {ActionTypes} from './actionTypes';
import {Order} from "../../../../interfaces/interfaces";

// export const fetchUserComments = (url: string, userId: string, token: string) => {
//     return {
//         type: ActionTypes.FETCH_USER_COMMENTS_START,
//         url,
//         userId,
//         token
//     }
// };
//
// export const fetchUserCommentsSuccess = (data: string) => {
//     return({
//         type: ActionTypes.FETCH_USER_COMMENTS_SUCCESS,
//         payload: data
//     })
// };
//
// export const fetchUserCommentsFail = (error: Error) => {
//     return({
//         type: ActionTypes.FETCH_USER_COMMENTS_FAIL,
//         payload: error.message
//     })
// };

export const saveUserOrder = (form: Order, userId: string, token: string) => {
    return {
        type: ActionTypes.SAVE_USER_ORDER_START,
        userId,
        token,
        form
    }
};

export const saveUserOrderSuccess = (data: string) => {
    return({
        type: ActionTypes.SAVE_USER_ORDER_SUCCESS,
        payload: data
    })
};

export const saveUserOrderFail = (error: Error) => {
    return({
        type: ActionTypes.SAVE_USER_ORDER_START,
        payload: error.message
    })
};

export const clearUserOrdersMessage = () => ({type: ActionTypes.CLEAR_MESSAGE});

export const initUserOrdersState = () => ({type: ActionTypes.INIT_STATE});

