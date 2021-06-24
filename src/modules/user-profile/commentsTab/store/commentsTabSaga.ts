import {put, call, all} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {
    fetchUserCommentsSuccess,
    fetchUserCommentsFail,
    initUserCommentsState
} from "./actions";
import { fetchGet } from "../../../../helpers/get";
import {LOGOUT} from "../../../authorization/store/keys";

const takeEvery: any = Eff.takeEvery;
const takeLatest: any = Eff.takeLatest;

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

export function* onFetchUserComments() {
    yield takeEvery(ActionTypes.FETCH_USER_COMMENTS_START, fetchUserCommentsWorker);
}


export function* onLogout(){
    yield takeLatest(LOGOUT,initUserCommentsState);
}

export function* userCommentsWatcher() {
    yield all([
        call(onFetchUserComments),
        call(onLogout)
    ]);
}
