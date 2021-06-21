import {CartItemInterface, Order} from "../interfaces/interfaces";

export const addItem = (oldArray: CartItemInterface[], itemToAdd: CartItemInterface): CartItemInterface[] => {
    const filteredArray = oldArray.filter(item => item.id === itemToAdd.id && item.title === itemToAdd.title);

    if (filteredArray.length === 0) {
        oldArray.push(itemToAdd);
        return new Array(...oldArray);
    } else {
        return oldArray.map(item => {
            if (item.id === itemToAdd.id && item.title === itemToAdd.title) {
                return {...item, quantity: item.quantity + 1};
            }
            return item;
        })
    }
}


export const decreaseItem = (oldArray: CartItemInterface[], itemToDecrease: CartItemInterface): CartItemInterface[] => {
    return oldArray.map(item => {
        if (item.id === itemToDecrease.id && item.title === itemToDecrease.title) {
            return {...item, quantity: item.quantity - 1};
        }
        return item;
    })
}


export const removeOneItem = (oldArray: CartItemInterface[], itemToDelete: CartItemInterface): CartItemInterface[] => {
    return oldArray.filter(element => element.id !== itemToDelete.id && element.title !== itemToDelete.title);
}


export const getTotalPrice = (items: CartItemInterface[]): number => {
    return items.reduce((accumulator, item) => accumulator + (item.quantity * item.price),0);
}


export const getTotalQuantity = (items: CartItemInterface[]): number => {
    return items.reduce((accumulator, item) => accumulator + item.quantity,0);
}

export const convertDataToSave = (items: CartItemInterface[]): Order => {
    return {
        items: items.map((item) => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        })
    };
}
