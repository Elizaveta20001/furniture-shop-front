import {put, call} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {saveUserOrderFail, saveUserOrderSuccess} from "./actions";
import {saveOrderApiCall} from "../api";
import {saveOrderParams} from "../../../../interfaces/interfaces";

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

export function* userOrdersWatcher() {
    yield takeEvery(ActionTypes.SAVE_USER_ORDER_START, saveUserOrderWorker);
}
