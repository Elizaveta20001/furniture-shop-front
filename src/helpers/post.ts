interface Params {
    url: string;
    method: string;
    form: string;
    headers: any;
}

export const fetchPost = (params: Params) => {
    let {url, method, form, headers} = params;
    if(form){
        form = JSON.stringify(form);
        headers['Content-Type'] = 'application/json';
    }
    return fetch(url, {method, body: form, headers});
}
