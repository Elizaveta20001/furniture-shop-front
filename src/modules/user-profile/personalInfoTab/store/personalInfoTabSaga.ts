import {put, call, all} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {
    fetchUserDataFail,
    fetchUserDataSuccess,
    updateUserDataSuccess,
    updateUserDataFail,
    updateUserPasswordSuccess,
    updateUserPasswordFail,
} from "./actions";
import { fetchGet } from "../../../../helpers/get";
import { fetchPost } from "../../../../helpers/post";

const takeEvery: any = Eff.takeEvery;

export function* fetchUserDataWorker(args: any): any {

    const result = yield call(fetchGet, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchUserDataSuccess(response));
    }
    else {
        const json = yield call(() => new Promise(res => res(result.json())));
        yield put(fetchUserDataFail(json));
    }
};

export function* updateUserDataWorker(args: any): any {

    const result = yield call(fetchPost, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(updateUserDataSuccess(response));
    }
    else {
        const json = yield call(() => new Promise(res => res(result.json())));
        yield put(updateUserDataFail(json));
    }

};

export function* updateUserPasswordWorker(args: any): any {

    const result = yield call(fetchPost, args);

    if (result.ok) {
        yield put(updateUserPasswordSuccess());
    }
    else {
        const json = yield call(() => new Promise(res => res(result.json())));
        yield put(updateUserPasswordFail(json));
    }

};

export function* onFetchUserData() {
    yield takeEvery(ActionTypes.FETCH_USER_DATA_START, fetchUserDataWorker);
}

export function* onUpdateUserData() {
    yield takeEvery(ActionTypes.UPDATE_USER_DATA_START, updateUserDataWorker);
}

export function* onUpdateUserPassword() {
    yield takeEvery(ActionTypes.UPDATE_USER_PASSWORD_START, updateUserPasswordWorker);
}

export function* userDataWatcher() {
    yield all([
        call(onFetchUserData),
        call(onUpdateUserData),
        call(onUpdateUserPassword),
    ]);
}
