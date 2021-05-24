import {put} from "redux-saga/effects";
import * as Eff from "redux-saga/effects";

import {LOGOUT} from "../../authorization/store/keys";
import {removeAllItems} from "./actions";


const takeLatest: any = Eff.takeLatest;


export function* clearCart(){
    yield put(removeAllItems());
}

export function* cartWatcher(){
    yield takeLatest(LOGOUT,clearCart);
}