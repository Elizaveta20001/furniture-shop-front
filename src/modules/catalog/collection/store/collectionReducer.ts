import {CollectionActionTypes} from './actionTypes';
import {CatalogInterface} from "../../../../interfaces/interfaces";


const INITIAL_STATE: CatalogInterface = {
    items : [],
    title: '',
    error: ''
};

export const collectionReducer = (state=INITIAL_STATE, action: any) => {
    switch (action.type) {
        case CollectionActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                items: action.payload.items,
                title: action.payload.title,
                error: ''

            }
        case CollectionActionTypes.CLEAR_DATA:
            return {
                ...state,
                items: [],
                title: "",
                error: ""
            }
        case CollectionActionTypes.FETCH_FAIL:
            return {
                ...state,
                items: [],
                title: '',
                error: action.payload
            }
        case CollectionActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }

        default:
            return state;

    }
};
