import {CartActionTypes} from "./actionTypes";
import {CartItemInterface, CatalogItem} from "../../../interfaces/interfaces";


export const addItemToTheCart = (item: CatalogItem) => {
    return({
        type: CartActionTypes.ADD_ITEM_TO_THE_CART,
        payload: item
    })
}


export const decreaseItemFromTheCart = (item: CartItemInterface) =>{
    if(item.quantity === 1){
        return ({
            type: CartActionTypes.REMOVE_ONE_ITEM_FROM_THE_CART,
            payload: item
        })
    }
    return({
        type: CartActionTypes.DECREASE_ITEM,
        payload: item
    })
}


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