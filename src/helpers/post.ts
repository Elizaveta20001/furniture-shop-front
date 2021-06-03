import {apiReg} from "../modules/sign-up/constants";

interface Params {
    url: string;
    method: string;
    form: any;
    headers: any;
}

export const fetchPost = (params: Params) => {
    let {url, method, form, headers} = params;

    switch (url) {
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
