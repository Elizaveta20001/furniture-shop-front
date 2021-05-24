import {CartItem} from "../interfaces/interfaces";

export const addItem = (oldArray: CartItem[], itemToAdd: CartItem): CartItem[] => {
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