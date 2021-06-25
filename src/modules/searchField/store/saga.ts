import {put, call} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {fetchSearchItemsSuccess, fetchSearchItemsFail, fetchSearchItems} from './actions';
import {enter, logout} from "../../authorization/store/actions";
import { fetchGet } from "../../../helpers/get";

const takeEvery: any = Eff.takeEvery;

export function* logoutWorker() {
    yield put(logout());
    yield localStorage.removeItem('userData');
    yield put(enter(true));
}

export function* searchWorker(args: any): any {

    const result = yield call(fetchGet, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchSearchItemsSuccess(response));
    }
    else {
        const json = yield result.json();
        yield put(fetchSearchItemsFail(json));
        if (result.statusText === "Unauthorized") {
            const {url, method,form} = args;
            yield put(fetchSearchItems(url,method, form, '',''));
            yield logoutWorker()
        }
    }
};

export function* searchWatcher() {
    yield takeEvery(ActionTypes.FETCH_SEARCH_ITEMS_START, searchWorker);
};
