import {uriForUser} from "../modules/user-profile/constants";
import {uriForSearch} from "../modules/searchField/constants";

interface Params {
    url: string;
    method: string;
    form: any;
    headers: any;
    userId: string;
}

export const fetchGet = (params: Params) => {
    let {url, form, userId} = params;

    switch (url) {
        case uriForUser: return fetch(url + userId);
        case uriForSearch: return fetch(url + '?' + new URLSearchParams({...form}));
        default: return null;
    }





}
