interface Params {
    url: string;
    method: string;
    form: any;
    headers: any;
}

export const fetchGet = (params: Params) => {
    let {url, form, headers} = params;
    if (form) headers['Content-Type'] = 'application/json';

    return fetch(url + '?' + new URLSearchParams({...form}));
}
