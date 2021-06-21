import { ActionTypes } from "./actionTypes";

interface UserCommentsInterface {
    userOrders: any,
    isFetching: boolean,
    message: string
};

const INITIAL_STATE: UserCommentsInterface = {
    userOrders : [],
    isFetching: true,
    message: ''
};

export const userOrdersReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        // case ActionTypes.FETCH_USER_COMMENTS_START:
        //     return {
        //         ...state,
        //         isFetching: true,
        //     }
        // case ActionTypes.FETCH_USER_COMMENTS_SUCCESS:
        //     return {
        //         ...state,
        //         userComments: action.payload,
        //         isFetching: false,
        //     }
        // case ActionTypes.FETCH_USER_COMMENTS_FAIL:
        //     return {
        //         ...state,
        //         userComments: [],
        //         isFetching: false,
        //         message: action.payload
        //     }
        case ActionTypes.SAVE_USER_ORDER_SUCCESS:
            return {
                ...state,
                message: action.payload,
            }
        case ActionTypes.SAVE_USER_ORDER_FAIL:
            return {
                ...state,
                message: action.payload
            }
        case ActionTypes.CLEAR_MESSAGE:
            return {
                ...state,
                message: '',
            };
        case ActionTypes.INIT_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};
