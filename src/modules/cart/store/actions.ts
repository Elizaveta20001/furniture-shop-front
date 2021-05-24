import {CartActionTypes} from "./actionTypes";
import {CatalogItem} from "../../../interfaces/interfaces";


export const addItemToTheCart = (item: CatalogItem) => {
    return({
        type: CartActionTypes.ADD_ITEM_TO_THE_CART,
        payload: item
    })
}


// export const decreaseItem = (element: CatalogItem) =>{
//     return({
//         type: CartActionTypes.DECREASE_ITEM,
//         payload: element
//     })
// }


export const removeAllItems = () => {
    return({
        type: CartActionTypes.REMOVE_ALL_ITEMS_FROM_THE_CART
    })
}


export const removeOneItems = (item: CatalogItem) => {
    return({
        type: CartActionTypes.REMOVE_ONE_ITEM_FROM_THE_CART,
        payload: item
    })
}