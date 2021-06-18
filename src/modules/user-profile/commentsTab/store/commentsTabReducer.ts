import { ActionTypes } from "./actionTypes";

interface UserCommentsInterface {
    userComments: object[],
    isFetching: boolean,
    message: string
};

const INITIAL_STATE: UserCommentsInterface = {
    userComments : [],
    isFetching: true,
    message: ''
};

export const userCommentsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_COMMENTS_START:
            return {
                ...state,
                isFetching: true,
            }
        case ActionTypes.FETCH_USER_COMMENTS_SUCCESS:
            return {
                ...state,
                userComments: action.payload,
                isFetching: false,
            }
        case ActionTypes.FETCH_USER_COMMENTS_FAIL:
            return {
                ...state,
                userComments: [],
                isFetching: false,
                message: action.payload
            }
        case ActionTypes.CLEAR_MESSAGE:
            return {
                ...state,
                message: '',
            };
        default:
            return state;
    }
};
