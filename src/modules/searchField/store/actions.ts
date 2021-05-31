import {ActionTypes} from './actionTypes';

// export const fetchSearchItems = (field: string) =>{
//     return({
//         type: ActionTypes.FETCH_SEARCH_ITEMS_START,
//         field
//     })
// };

interface Form {
    field: string;
    collectionName: string;
}

export const fetchSearchItems = (url: string, method: string, form: Form, headers: any) => {
    return {
        type: ActionTypes.FETCH_SEARCH_ITEMS_START,
        url,
        method,
        form,
        headers
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

