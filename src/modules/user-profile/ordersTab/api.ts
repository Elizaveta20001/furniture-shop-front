import {uriForUser} from "../constants";
import {saveOrderParams} from "../../../interfaces/interfaces";

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
