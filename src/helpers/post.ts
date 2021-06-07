import {apiReg} from "../modules/sign-up/constants";
import {uriForUser} from "../modules/user-profile/constants";

interface Params {
    url: string;
    method: string;
    form: any;
    headers: any;
    userId: string;
}

export const fetchPost = (params: Params) => {
    let {url, method, form, headers, userId} = params;

    switch (url) {
        case uriForUser: return fetch(url + userId, {method, body: form});
        case apiReg: return fetch(url, {method, body: form});
        default: {
            if (form) {
                form = JSON.stringify(form);
                headers['Content-Type'] = 'application/json';
            }
            return fetch(url, {method, body: form, headers});
        }
    }
}
