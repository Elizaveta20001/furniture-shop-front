import {CollectionItemActionTypes} from "./actionTypes";
import {CollectionItemState} from "../../../../interfaces/interfaces";

const INITIAL_STATE: CollectionItemState = {
    price: 0,
    url: "",
    description: "",
    title: "",
    error: "",
    isFetched: false
}

export const collectionItemReducer = (state=INITIAL_STATE, action: any)=>{
    switch (action.type) {
        case CollectionItemActionTypes.FETCH_COLLECTION_ITEM_SUCCESS:
            return {
                ...state,
                price: action.payload.price,
                url: action.payload.url,
                description: action.payload.description,
                title: action.payload.title,
                error: "",
                isFetched: true
            }
        case CollectionItemActionTypes.FETCH_COLLECTION_ITEM_FAIL:
            return {
                ...state,
                price: "",
                url: "",
                description: "",
                title: "",
                error: action.payload,
                isFetched: false
            }
        case CollectionItemActionTypes.CLEAR_COLLECTION_ITEM_DATA:
            return {
                ...state,
                price: "",
                url: "",
                description: "",
                title: "",
                error: "",
                isFetched: false
            }
        default:
            return state;
    }
};