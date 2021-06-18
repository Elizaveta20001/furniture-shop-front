import { ActionTypes } from "./actionTypes";
import {userComment, UserComments} from "../../../../interfaces/interfaces";

interface UserCommentsInterface {
    userComments: UserComments[],
    isFetching: boolean,
    message: string
};

const defaultUserComment:userComment = {
    text: '',
    createdAt: new Date(),
    id: ''
}

const defaultUserCommentsData:UserComments = {
    comments: [defaultUserComment],
    description: '',
    price: 0,
    title: '',
    url: '',
    id: 0
}

const INITIAL_STATE: UserCommentsInterface = {
    userComments : [defaultUserCommentsData],
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
