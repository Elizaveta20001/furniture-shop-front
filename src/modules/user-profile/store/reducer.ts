import { combineReducers } from 'redux';

import { userDataReducer } from "../personalInfoTab/store/personalInfoTabReducer";
import { userCommentsReducer } from "../commentsTab/store/commentsTabReducer";
import { userRatingsReducer } from "../ratingsTab/store/ratingsTabReducer";
import { userOrdersReducer } from "../ordersTab/store/ordersTabReducer";
import { userFavoritesReducer } from "../favoritesTab/store/favoritsTabReducer";

export const userReducer = combineReducers({
    userDataReducer,
    userCommentsReducer,
    userRatingsReducer,
    userOrdersReducer,
    userFavoritesReducer
})
