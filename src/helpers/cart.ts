import {CartItemInterface} from "../interfaces/interfaces";

export const addItem = (oldArray: CartItemInterface[], itemToAdd: CartItemInterface): CartItemInterface[] => {
    const filteredArray = oldArray.filter(item => item.id === itemToAdd.id && item.title === itemToAdd.title);

    if (filteredArray.length === 0) {
        oldArray.push(itemToAdd);
        return oldArray;
    } else {
        return oldArray.map(item => {
            if (item.id === itemToAdd.id && item.title === itemToAdd.title) {
                return {...item, quantity: item.quantity + 1}
            }
            return item;
        })
    }
}


export const removeOneItem = (oldArray: CartItemInterface[], itemToDelete: CartItemInterface): CartItemInterface[] =>{
    return oldArray.filter(element => element.id !== itemToDelete.id && element.title !== itemToDelete.title);
}