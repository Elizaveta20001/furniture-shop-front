interface Params {
    url: string;
    method: string;
    form: any;
    headers: any;
}

export const fetchPost = (params: Params) => {
    let {url, method, form, headers} = params;

    if (form && !headers['Content-Type']) {
        form = JSON.stringify(form);
        headers['Content-Type'] = 'application/json';
    }
    return fetch(url, {method, body: form, headers});
}
