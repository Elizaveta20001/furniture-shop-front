import {Rating} from "../interfaces/interfaces";


export const getRating = (values: Rating[]) => {
    let averageValue  = values.reduce((accumulator, element) => accumulator + element.value,0);
    return Math.trunc((averageValue / values.length) * 100) / 100;
}
