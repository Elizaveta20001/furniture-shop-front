import {takeEvery, call, put} from 'redux-saga/effects';
import { fetchPost } from '../../../helpers/post';
import { error } from './actions';
import { FETCH_REGIN } from './keys';


// interface Params {
//     url: string;
//     method: string;
//     form: string;
//     headers: any;
// };

// const fetchReginFromApi = (params: Params) => {
//     let {url, method, form, headers} = params;
//     if(form){
//         form = JSON.stringify(form);
//         headers['Content-Type'] = 'application/json';
//     }
//     return fetch(url, {method, body: form, headers});
// };


function* fetchReginWorker(args: any): any {
    const data = yield call(fetchPost, args);
    const json = yield call(() => new Promise(res => res(data.json())));
    if(json.message){
        yield put(error(json));
    }
};

export function* reginWatcher() {
    yield takeEvery(FETCH_REGIN, fetchReginWorker);
};
