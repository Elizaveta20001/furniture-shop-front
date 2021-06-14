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

    console.log('url', url);
    console.log('method',method);
    console.log('form',form);
    console.log('headers',headers);
    console.log('userId',userId)


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
            console.log('result', result);
            return result;
        }
        case uriForUser: {
            console.log('check');
            console.log('form.image', form.get("image"));
            console.log('form.firstName', form.get("firstName"));
            console.log('form.lastName',form.get("lastName"));
            console.log('form.email', form.get("email"));

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
            console.log('check 2');
            if (form) {
                form = JSON.stringify(form);
                headers['Content-Type'] = 'application/json';
            }
            return fetch(url, {method, body: form, headers});
        }
    }
}
