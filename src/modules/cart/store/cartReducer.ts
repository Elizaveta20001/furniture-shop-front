import {CartActionTypes} from "./actionTypes";
import {CartState} from "../../../interfaces/interfaces";
import {addItem, removeOneItem} from "../../../helpers/cart";


const INITIAL_STATE: CartState = {
    items: [],
}


export const cartReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case CartActionTypes.ADD_ITEM_TO_THE_CART:
            return ({
                ...state,
                items: addItem(state.items, {...action.payload, quantity: 1})
            });
        case CartActionTypes.REMOVE_ONE_ITEM_FROM_THE_CART:
            return ({
                ...state,
                items: removeOneItem(state.items, action.payload)
            });
        case CartActionTypes.REMOVE_ALL_ITEMS_FROM_THE_CART:
            return ({
                ...state,
                items: []
            });
        default:
            return state;
    }
}