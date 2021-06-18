import {uriForUser, uriForUserComments} from "../modules/user-profile/constants";
import {uriForSearch} from "../modules/searchField/constants";

interface Params {
    url: string;
    method: string;
    form: any;
    userId: string;
    token: string;
}

export const fetchGet = (params: Params) => {

    let {url, form, userId, token} = params;
    let headers = {
        'Authorization': `Bearer ${token}`
    };

    switch (url) {
        case uriForUser: return fetch(url + userId, {headers});
        case uriForUserComments: return fetch(url + userId, {headers});
        case uriForSearch: return fetch(url + '?' + new URLSearchParams({...form}), {headers});
        default: return null;
    }
}
