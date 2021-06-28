import {uriForCollection} from "../constants";
import {fetchCollectionItemParams} from "../../../interfaces/interfaces";

export const fetchCollectionItemApiCall = async (params: fetchCollectionItemParams) => {
    let {userId, token, path} = params;

    if (!!userId)
        return fetch(
            uriForCollection + '/' + path + '/user/' + userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

    return fetch(`${uriForCollection}${path}`)
}
