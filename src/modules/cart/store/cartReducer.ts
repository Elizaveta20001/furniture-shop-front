import {CartActionTypes} from "./actionTypes";
import {CartState} from "../../../interfaces/interfaces";
import {addItem} from "../../../helpers/cart";


const INITIAL_STATE: CartState = {
    items: [],
}


export const cartReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case CartActionTypes.ADD_ITEM_TO_THE_CART:
            return ({
                ...state,
                items: addItem(state.items,{...action.payload, quantity: 1})
            })
        default:
            return state;
    }
}