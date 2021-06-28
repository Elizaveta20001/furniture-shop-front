import {uriForCollection} from "../constants";
import {fetchCollectionParams} from "../../../interfaces/interfaces";

export const fetchCollectionApiCall = async (params: fetchCollectionParams) => {
    let {userId, token, catalogName} = params;

    if (!!userId)
        return fetch(
        uriForCollection + '/' + catalogName + '/user/' + userId,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return fetch(`${uriForCollection}/${catalogName}`)
}
