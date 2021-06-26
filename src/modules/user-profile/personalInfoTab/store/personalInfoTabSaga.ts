import {put, call, all} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {LOGOUT} from "../../../authorization/store/keys";
import {
    fetchUserDataFail,
    fetchUserDataSuccess,
    updateUserDataSuccess,
    updateUserDataFail,
    updateUserPasswordSuccess,
    updateUserPasswordFail, initUserDataState,
} from "./actions";
import { fetchGet } from "../../../../helpers/get";
import { fetchPost } from "../../../../helpers/post";
import {enter, logout} from "../../../authorization/store/actions";


const takeEvery: any = Eff.takeEvery;
const takeLatest: any = Eff.takeLatest;

export function* logoutWorker() {
    yield put(logout());
    yield localStorage.removeItem('userData');
    yield put(enter(true));
}

export function* fetchUserDataWorker(args: any): any {

    const result = yield call(fetchGet, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchUserDataSuccess(response));
    }
    else {
        const json = yield result.json();
        if (result.statusText === "Unauthorized") yield logoutWorker();
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
        const json = yield result.json();
        if (result.statusText === "Unauthorized") yield logoutWorker();
        yield put(updateUserDataFail(json));
    }

};

export function* updateUserPasswordWorker(args: any): any {

    const result = yield call(fetchPost, args);

    if (result.ok) {
        yield put(updateUserPasswordSuccess());
    }
    else {
        const json = yield result.json();
        if (result.statusText === "Unauthorized") yield logoutWorker();
        yield put(updateUserPasswordFail(json));
    }

};

export function* clearState(){
    yield put(initUserDataState());
}

export function* onFetchUserData() {
    yield takeEvery(ActionTypes.FETCH_USER_DATA_START, fetchUserDataWorker);
}

export function* onUpdateUserData() {
    yield takeEvery(ActionTypes.UPDATE_USER_DATA_START, updateUserDataWorker);
}

export function* onUpdateUserPassword() {
    yield takeEvery(ActionTypes.UPDATE_USER_PASSWORD_START, updateUserPasswordWorker);
}

export function* onLogout(){
    yield takeLatest(LOGOUT,clearState);
}

export function* userDataWatcher() {
    yield all([
        call(onFetchUserData),
        call(onUpdateUserData),
        call(onUpdateUserPassword),
        call(onLogout)
    ]);
}
