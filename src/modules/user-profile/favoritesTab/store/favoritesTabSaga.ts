import {put, call, all} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {LOGOUT} from "../../../authorization/store/keys";
import {
    addToUserFavoritesSuccess,
    addToUserFavoritesFail,
    initUserFavoritesState,
    fetchUserFavoritesSuccess, fetchUserFavoritesFail
} from "./actions";
import {enter, logout} from "../../../authorization/store/actions";
import {addToFavoritesApiCall, fetchFavoritesApiCall} from "../favoriteTabApis";
import {addToFavoritesParams, basicUserParams} from "../../../../interfaces/interfaces";



const takeEvery: any = Eff.takeEvery;
const takeLatest: any = Eff.takeLatest;

export function* logoutWorker() {
    yield put(logout());
    yield localStorage.removeItem('userData');
    yield put(enter(true));
}

export function* addToUserFavoritesWorker(args:addToFavoritesParams): any {

    const result = yield call(addToFavoritesApiCall, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(addToUserFavoritesSuccess(response));
    }
    else {
        const json = yield result.json();
        if (result.statusText === "Unauthorized") yield logoutWorker();
        yield put(addToUserFavoritesFail(json));
    }

};

export function* fetchUserFavoritesWorker(args:basicUserParams): any {

    const result = yield call(fetchFavoritesApiCall, args);

    if (result.ok) {
        const response = yield result.json();
        yield put(fetchUserFavoritesSuccess(response));
    }
    else {
        const json = yield result.json();
        yield put(fetchUserFavoritesFail(json));
    }

};

export function* onAddToUserFavorites() {
    yield takeEvery(ActionTypes.ADD_TO_USER_FAVORITES_START, addToUserFavoritesWorker);
}

export function* onFetchUserFavorites() {
    yield takeEvery(ActionTypes.FETCH_USER_FAVORITES_START, fetchUserFavoritesWorker);
}

export function* onLogout(){
    yield takeLatest(LOGOUT,initUserFavoritesState);
}

export function* userFavoritesWatcher() {
    yield all([
        call(onAddToUserFavorites),
        call(onFetchUserFavorites),
        call(onLogout)
    ]);
}
