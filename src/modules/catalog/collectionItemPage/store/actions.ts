import {CollectionItemActionTypes} from "./actionTypes";


export const fetchCollectionItem = (path: string, userId: string, token: string) => {
    return ({
        type: CollectionItemActionTypes.FETCH_COLLECTION_ITEM_START,
        path,
        userId,
        token
    })
};


export const fetchCollectionItemSuccess = (collectionItemData: string) => {
    return ({
        type: CollectionItemActionTypes.FETCH_COLLECTION_ITEM_SUCCESS,
        payload: collectionItemData
    })
};


export const fetchCollectionItemFail = (error: Error) => {
    return({
        type: CollectionItemActionTypes.FETCH_COLLECTION_ITEM_FAIL,
        payload: error.message
    })
};


export const collectionItemClear = () => {
    return({
        type: CollectionItemActionTypes.CLEAR_COLLECTION_ITEM_DATA,
    })
}

export const clearCollectionItemError = () => {
    return({
        type: CollectionItemActionTypes.CLEAR_ERROR,
    })
}
