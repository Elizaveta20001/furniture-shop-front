import { ActionTypes } from "./actionTypes";


interface SearchResultsInterface {
    results: any[],
    isFetching: boolean,
    error: string
};

const INITIAL_STATE: SearchResultsInterface = {
    results : [],
    isFetching: false,
    error: ''
};

export const searchResultsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.FETCH_SEARCH_ITEMS_START:
            return {
                ...state,
                isFetching: true,
            }
        case ActionTypes.FETCH_SEARCH_ITEMS_SUCCESS:
            return {
                ...state,
                results: action.payload.searchResult,
                isFetching: false
            }
        case ActionTypes.FETCH_SEARCH_ITEMS_FAIL:
            return {
                ...state,
                results: [],
                isFetching: false,
                error: action.payload
            }
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }
        default:
            return state;
    }
};
