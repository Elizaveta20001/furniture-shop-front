import {all} from 'redux-saga/effects';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loginWatcher } from '../modules/authorization/store/loginSaga';
import { reginWatcher } from '../modules/authorization/store/reginSaga';
import { collectionWatcher } from '../modules/catalog/collection/store/collectionSaga';
import loginReducer from '../modules/authorization/store/loginReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import {catalogReducer} from '../modules/catalog/store/reducer';
import { catalogWatcher } from '../modules/catalog/mainPage/store/catalogSaga';
import {collectionItemWatcher} from "../modules/catalog/collectionItemPage/store/collectionItemSaga";
import { searchWatcher } from '../modules/searchField/store/saga';
import { searchResultsReducer } from '../modules/searchField/store/reducer';
import {cartReducer} from "../modules/cart/store/cartReducer";


function* rootWatcher() {
    yield all([loginWatcher(), reginWatcher(), catalogWatcher(), collectionWatcher(),collectionItemWatcher(), searchWatcher()]);
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    loginReducer,
    catalogReducer,
    searchResultsReducer,
    cartReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootWatcher);