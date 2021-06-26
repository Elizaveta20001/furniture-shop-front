import { ActionTypes } from "./actionTypes";
import {FavoritesItem} from "../../../../interfaces/interfaces";

interface UserOrdersInterface {
    userFavorites: FavoritesItem[],
    isFetching: boolean,
    message: string
};

const INITIAL_STATE: UserOrdersInterface = {
    userFavorites : [],
    isFetching: true,
    message: ''
};

export const userFavoritesReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        // case ActionTypes.FETCH_USER_ORDERS_START:
        //     return {
        //         ...state,
        //         isFetching: true,
        //     }
        // case ActionTypes.FETCH_USER_ORDERS_SUCCESS:
        //     return {
        //         ...state,
        //         userOrders: action.payload.orderHistory,
        //         isFetching: false,
        //     }
        // case ActionTypes.FETCH_USER_ORDERS_FAIL:
        //     return {
        //         ...state,
        //         userOrders: [],
        //         isFetching: false,
        //         message: action.payload.message
        //     }
        case ActionTypes.ADD_TO_USER_FAVORITES_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
            }
        case ActionTypes.ADD_TO_USER_FAVORITES_FAIL:
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
