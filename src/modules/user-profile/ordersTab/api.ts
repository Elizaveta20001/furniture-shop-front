import {uriForUser} from "../constants";
import {basicUserParams, saveOrderParams} from "../../../interfaces/interfaces";

export const saveOrderApiCall = async (params: saveOrderParams) => {
    let {form, userId, token} = params;

    return fetch(
        uriForUser + userId + '/order-history',
        {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export const fetchOrdersApiCall = async (params: basicUserParams) => {
    let {userId, token} = params;

    return fetch(
        uriForUser + userId + '/order-history',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
}
