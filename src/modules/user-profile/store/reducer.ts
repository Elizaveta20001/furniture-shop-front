import { ActionTypes } from "./actionTypes";


interface UserDataInterface {
    userData: any,
    isFetching: boolean,
    isUpdating: boolean,
    userError: string
};

const INITIAL_STATE: UserDataInterface = {
    userData : undefined,
    isFetching: true,
    userError: '',
    isUpdating: false
};

export const userDataReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_DATA_START:
            return {
                ...state,
                isFetching: true,
            }
        case ActionTypes.FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isFetching: false
            }
        case ActionTypes.FETCH_USER_DATA_FAIL:
            return {
                ...state,
                userData: [],
                isFetching: false,
                fetchUserError: action.payload
            }
        case ActionTypes.UPDATE_USER_DATA_START:
            return {
                ...state,
                isUpdating: true,
            }
        case ActionTypes.UPDATE_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isUpdating: false
            }
        case ActionTypes.UPDATE_USER_DATA_FAIL:
            return {
                ...state,
                isUpdating: false,
                userError: action.payload
            }
        case ActionTypes.UPDATE_USER_PASSWORD_START:
            return {
                ...state,
                isUpdating: true,
            }
        case ActionTypes.UPDATE_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                isUpdating: false
            }
        case ActionTypes.UPDATE_USER_PASSWORD_FAIL:
            return {
                ...state,
                isUpdating: false,
                userError: action.payload
            }    
        default:
            return state;
    }
};
