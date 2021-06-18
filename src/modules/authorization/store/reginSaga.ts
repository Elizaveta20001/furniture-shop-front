import {takeEvery, call, put} from 'redux-saga/effects';
import { fetchPost } from '../../../helpers/post';
import { reginSuccess, reginFailure, fetchLogin } from './actions';
import { FETCH_REGIN } from './keys';
import {apiLogin} from "../constants";

function* fetchReginWorker(args: any): any {
    const data = yield call(fetchPost, args);

    const json = yield call(() => new Promise(res => res(data.json())));

    let dataForSignIn:any = {};
    for (let key of args.form.keys()) {
        dataForSignIn[key] = args.form.get(key);
    }

    if (data.ok) {
        yield put(fetchLogin(apiLogin,
            'POST',
            {
                email: dataForSignIn.email,
                password: dataForSignIn.password
            },
            {}))
        yield put(reginSuccess(json));
    }
    else {

        yield put(reginFailure(json));
    }

};

export function* reginWatcher() {
    yield takeEvery(FETCH_REGIN, fetchReginWorker);
};
