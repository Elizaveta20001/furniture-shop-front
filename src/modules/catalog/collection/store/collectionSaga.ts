import {put, call} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';

import {fetchCollectionParams} from "../../../../interfaces/interfaces";
import {CollectionActionTypes} from "./actionTypes";
import {fetchCollectionFail, fetchCollectionSuccess, clearCollection, fetchCollection} from "./actions";
import {enter, logout} from "../../../authorization/store/actions";

import {fetchCollectionApiCall} from "../collectionPageApis";



const takeEvery: any = Eff.takeEvery;

export function* logoutWorker() {
    yield put(logout());
    yield localStorage.removeItem('userData');
    yield put(enter(true));
}

export function* collectionWorker(args: fetchCollectionParams): any {

    yield put(clearCollection());
    const result = yield call (fetchCollectionApiCall, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchCollectionSuccess(response));
    }
    else {
        const json = yield result.json();
        yield put(fetchCollectionFail(json));
        if (result.statusText === "Unauthorized") {
            const {catalogName} = args;
            yield put(fetchCollection(catalogName, '',''));
            yield logoutWorker()
        }
    }

};

export function* collectionWatcher() {
    yield takeEvery(CollectionActionTypes.FETCH_START, collectionWorker);
};
