import {put, call} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {
    fetchUserCommentsSuccess,
    fetchUserCommentsFail,
} from "./actions";
import { fetchGet } from "../../../../helpers/get";

const takeEvery: any = Eff.takeEvery;

export function* fetchUserCommentsWorker(args: any): any {

    const result = yield call(fetchGet, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchUserCommentsSuccess(response));
    }
    else {
        const json = yield call(() => new Promise(res => res(result.json())));
        yield put(fetchUserCommentsFail(json));
    }
};

export function* userCommentsWatcher() {
    yield takeEvery(ActionTypes.FETCH_USER_COMMENTS_START, fetchUserCommentsWorker);
}
