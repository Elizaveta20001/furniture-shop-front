import {uriForUser} from "../constants";
import {addToFavoritesParams} from "../../../interfaces/interfaces";

export const addToFavoritesApiCall = async (params: addToFavoritesParams) => {
    let {id, userId, token} = params;

    return fetch(
        uriForUser + userId + '/favorites',
        {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

// export const fetchOrdersApiCall = async (params: basicUserParams) => {
//     let {userId, token} = params;
//
//     return fetch(
//         uriForUser + userId + '/order-history',
//         {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         }
//     );
// }
