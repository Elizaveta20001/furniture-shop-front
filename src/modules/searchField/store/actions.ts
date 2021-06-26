import {ActionTypes} from './actionTypes';

interface Form {
    field: string;
    collectionName: string;
}

export const fetchSearchItems = (url: string, method: string, form: Form, userId: string, token: string) => {
    return {
        type: ActionTypes.FETCH_SEARCH_ITEMS_START,
        url,
        method,
        form,
        userId,
        token
    }
};

export const fetchSearchItemsSuccess = (data: string)=>{
    return({
        type: ActionTypes.FETCH_SEARCH_ITEMS_SUCCESS,
        payload: data
    })
};

export const fetchSearchItemsFail = (error: Error)=>{
    return({
        type: ActionTypes.FETCH_SEARCH_ITEMS_FAIL,
        payload: error.message
    })
};

export const clearSearchResultsError = () => ({type: ActionTypes.CLEAR_ERROR});

