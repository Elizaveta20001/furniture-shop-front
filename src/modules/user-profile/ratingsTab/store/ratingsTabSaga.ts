import {put, call} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {
    fetchUserRatingsSuccess,
    fetchUserRatingsFail
} from "./actions";
import { fetchGet } from "../../../../helpers/get";

const takeEvery: any = Eff.takeEvery;

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

export function* userRatingsWatcher() {
    yield takeEvery(ActionTypes.FETCH_USER_RATINGS_START, fetchUserRatingsWorker);
}
