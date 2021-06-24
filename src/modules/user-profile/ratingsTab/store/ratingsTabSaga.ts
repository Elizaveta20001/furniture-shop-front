import {put, call, all} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {
    fetchUserRatingsSuccess,
    fetchUserRatingsFail, initUserRatingsState
} from "./actions";
import { fetchGet } from "../../../../helpers/get";
import {LOGOUT} from "../../../authorization/store/keys";

const takeEvery: any = Eff.takeEvery;
const takeLatest: any = Eff.takeLatest;

export function* fetchUserRatingsWorker(args: any): any {

    const result = yield call(fetchGet, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchUserRatingsSuccess(response));
    }
    else {
        const json = yield call(() => new Promise(res => res(result.json())));
        yield put(fetchUserRatingsFail(json));
    }
};

export function* onFetchUserRatings() {
    yield takeEvery(ActionTypes.FETCH_USER_RATINGS_START, fetchUserRatingsWorker);
}

export function* onLogout(){
    yield takeLatest(LOGOUT,initUserRatingsState);
}

export function* userRatingsWatcher() {
    yield all([
        call(onFetchUserRatings),
        call(onLogout)
    ]);
}
