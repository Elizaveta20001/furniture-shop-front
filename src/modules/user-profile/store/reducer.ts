import { combineReducers } from 'redux';

import { userDataReducer } from "../personalInfoTab/store/personalInfoTabReducer";
import { userCommentsReducer } from "../commentsTab/store/commentsTabReducer";
import { userOrdersReducer } from "../ordersTab/store/ordersTabReducer";

export const userReducer = combineReducers({
    userDataReducer,
    userCommentsReducer,
    userOrdersReducer
})
