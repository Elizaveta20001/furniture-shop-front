import {put, call, all} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {
    fetchUserDataFail, 
    fetchUserDataSuccess, 
    updateUserDataSuccess, 
    updateUserDataFail, 
    updateUserPasswordSuccess,
    updateUserPasswordFail
} from "./actions";
import { fetchGet } from "../../../helpers/get";
import { fetchPost } from "../../../helpers/post";


const takeEvery: any = Eff.takeEvery;

export function* fetchUserDataWorker(args: any): any {
    try {
        const data = yield call(fetchGet, args);
        const response = yield data.json();
        yield put(fetchUserDataSuccess(response));
    } catch (error) {
        yield put(fetchUserDataFail(error));
    }
};

export function* updateUserDataWorker(args: any): any {
    try {
        const data = yield call(fetchPost, args);
        const response = yield data.json();
        yield put(updateUserDataSuccess(response));
    } catch (error) {
        yield put(updateUserDataFail(error));
    }
};

export function* updateUserPasswordWorker(args: any): any {
    try {
        yield console.log('args', args);
        yield call(fetchPost, args);
        yield put(updateUserPasswordSuccess());
    } catch (error) {
        yield put(updateUserDataFail(error));
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
