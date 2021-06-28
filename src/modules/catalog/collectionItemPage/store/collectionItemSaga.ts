import {put, call} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';

import {CollectionItemActionTypes} from "./actionTypes";
import {fetchCollectionItemFail, fetchCollectionItemSuccess, collectionItemClear} from "./actions";
import {enter, logout} from "../../../authorization/store/actions";
import {fetchCollectionItemParams} from "../../../../interfaces/interfaces";
import {fetchCollectionItemApiCall} from "../collectionItemPageApis";


const takeEvery: any = Eff.takeEvery;

export function* logoutWorker() {
    yield put(logout());
    yield localStorage.removeItem('userData');
    yield put(enter(true));
}

export function* startFetchCollectionItem(args: fetchCollectionItemParams): any {

    yield put(collectionItemClear());
    const result = yield call (fetchCollectionItemApiCall, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchCollectionItemSuccess(response));
    }
    else {
        const json = yield result.json();
        yield put(fetchCollectionItemFail(json));
        if (result.statusText === "Unauthorized") yield logoutWorker()
    }

};


export function* collectionItemWatcher() {
    yield takeEvery(CollectionItemActionTypes.FETCH_COLLECTION_ITEM_START, startFetchCollectionItem);
}

