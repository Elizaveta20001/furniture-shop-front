import {all} from 'redux-saga/effects';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {loginWatcher} from '../modules/authorization/store/loginSaga';
import {reginWatcher} from '../modules/authorization/store/reginSaga';
import {collectionWatcher} from '../modules/catalog/collection/store/collectionSaga';
import loginReducer from '../modules/authorization/store/loginReducer';
import reginReducer from "../modules/authorization/store/reginReducer";
import {userReducer} from "../modules/user-profile/store/reducer";
import {userDataWatcher} from "../modules/user-profile/personalInfoTab/store/personalInfoTabSaga";
import {userCommentsWatcher} from "../modules/user-profile/commentsTab/store/commentsTabSaga";
import {userRatingsWatcher} from "../modules/user-profile/ratingsTab/store/ratingsTabSaga";
import {composeWithDevTools} from 'redux-devtools-extension';
import {catalogReducer} from '../modules/catalog/store/reducer';
import {catalogWatcher} from '../modules/catalog/mainPage/store/catalogSaga';
import {collectionItemWatcher} from "../modules/catalog/collectionItemPage/store/collectionItemSaga";
import {searchWatcher} from '../modules/searchField/store/saga';
import {searchResultsReducer} from '../modules/searchField/store/reducer';
import {cartReducer} from "../modules/cart/store/cartReducer";
import {cartWatcher} from "../modules/cart/store/cartSaga";
import {userOrdersWatcher} from "../modules/user-profile/ordersTab/store/ordersTabSaga";



function* rootWatcher() {
    yield all([
                        loginWatcher(),
                        reginWatcher(),
                        catalogWatcher(),
                        collectionWatcher(),
                        collectionItemWatcher(),
                        searchWatcher(),
                        cartWatcher(),
                        userDataWatcher(),
                        userCommentsWatcher(),
                        userRatingsWatcher(),
                        userOrdersWatcher(),
             ]);
}


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    loginReducer,
    reginReducer,
    catalogReducer,
    searchResultsReducer,
    cartReducer,
    userReducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
export const persistedStore = persistStore(store);

sagaMiddleware.run(rootWatcher);
