import { ActionTypes } from "./actionTypes";
import {UserRatings} from "../../../../interfaces/interfaces";

interface UserRatingsInterface {
    userRatings: UserRatings[],
    isFetching: boolean,
    message: string
};

const INITIAL_STATE: UserRatingsInterface = {
    userRatings : [],
    isFetching: true,
    message: ''
};

export const userRatingsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_RATINGS_START:
            return {
                ...state,
                isFetching: true,
            }
        case ActionTypes.FETCH_USER_RATINGS_SUCCESS:
            return {
                ...state,
                userRatings: action.payload,
                isFetching: false,
            }
        case ActionTypes.FETCH_USER_RATINGS_FAIL:
            return {
                ...state,
                userRatings: [],
                isFetching: false,
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
