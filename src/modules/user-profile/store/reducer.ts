import { combineReducers } from 'redux';

import { userDataReducer } from "../personalInfoTab/store/personalInfoTabReducer";
import { userCommentsReducer } from "../commentsTab/store/commentsTabReducer";

export const userReducer = combineReducers({
    userDataReducer,
    userCommentsReducer,
})
