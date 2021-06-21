import {put, call, all} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {
    clearUserOrdersMessage,
    fetchUserOrdersFail,
    fetchUserOrdersSuccess, initUserOrdersState,
    saveUserOrderFail,
    saveUserOrderSuccess
} from "./actions";
import {fetchOrdersApiCall, saveOrderApiCall} from "../api";
import {basicUserParams, saveOrderParams} from "../../../../interfaces/interfaces";

const takeEvery: any = Eff.takeEvery;

export function* saveUserOrderWorker(args:saveOrderParams): any {

    const result = yield call(saveOrderApiCall, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(saveUserOrderSuccess(response));
    }
    else {
        const json = yield call(() => new Promise(res => res(result.json())));
        yield put(saveUserOrderFail(json));
    }

};

export function* fetchUserOrdersWorker(args:basicUserParams): any {

    const result = yield call(fetchOrdersApiCall, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchUserOrdersSuccess(response));
    }
    else {
        const json = yield call(() => new Promise(res => res(result.json())));
        yield put(fetchUserOrdersFail(json));
    }

};

export function* onSaveUserOrder() {
    yield takeEvery(ActionTypes.SAVE_USER_ORDER_START, saveUserOrderWorker);
}

export function* onFetchUserOrders() {
    yield takeEvery(ActionTypes.FETCH_USER_ORDERS_START, fetchUserOrdersWorker);
}

export function* userOrdersWatcher() {
    yield all([
        call(onSaveUserOrder),
        call(onFetchUserOrders),
    ]);
}
