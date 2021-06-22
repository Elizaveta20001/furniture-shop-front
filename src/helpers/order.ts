export const getTotalOrderPrice = (items: any): number => {
    return items.reduce((accumulator:number, item:any) => accumulator + (item.quantity * item.price),0);
}
