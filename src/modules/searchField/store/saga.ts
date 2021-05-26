import {put, call} from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {ActionTypes} from './actionTypes';
import {fetchSearchItemsSuccess, fetchSearchItemsFail} from './actions';
import { fetchPost } from '../../../helpers/post';


const takeEvery: any = Eff.takeEvery;

export function* searchWorker(args: any): any {
    try {
        const data = yield call(fetchPost, args);
        const response = yield data.json();
        yield put(fetchSearchItemsSuccess(response));
    } catch (error) {
        yield put(fetchSearchItemsFail(error));
    }
};

export function* searchWatcher() {
    yield takeEvery(ActionTypes.FETCH_SEARCH_ITEMS_START, searchWorker);
};
