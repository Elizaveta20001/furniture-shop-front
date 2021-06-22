import { ActionTypes } from "./actionTypes";

interface UserOrdersInterface {
    userOrders: any[],
    isFetching: boolean,
    message: string
};

const INITIAL_STATE: UserOrdersInterface = {
    userOrders : [],
    isFetching: true,
    message: ''
};

export const userOrdersReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_ORDERS_START:
            return {
                ...state,
                isFetching: true,
            }
        case ActionTypes.FETCH_USER_ORDERS_SUCCESS:
            return {
                ...state,
                userOrders: action.payload.orderHistory,
                isFetching: false,
            }
        case ActionTypes.FETCH_USER_ORDERS_FAIL:
            return {
                ...state,
                userOrders: [],
                isFetching: false,
                message: action.payload.message
            }
        case ActionTypes.SAVE_USER_ORDER_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
            }
        case ActionTypes.SAVE_USER_ORDER_FAIL:
            return {
                ...state,
                message: action.payload.message
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
