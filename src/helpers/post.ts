import {apiReg} from "../modules/authorization/constants";
import {uriForUser, uriForChangePass} from "../modules/user-profile/constants";

interface Params {
    url: string;
    method: string;
    form: any;
    headers: any;
    userId: string;
    token: string;
}

export const fetchPost = async (params: Params) => {
    let {url, method, form, headers, userId, token} = params;

    switch (url) {
        case uriForChangePass: {

            form = JSON.stringify(form);

            const result = await fetch(
                url + userId,
                {
                        method,
                        body: form,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
            );
            return result;
        }
        case uriForUser: {

            return fetch(
                url + userId,
                {
                        method,
                        body: form,
                        headers: {'Authorization': `Bearer ${token}`}
                    }
            );
        }
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
