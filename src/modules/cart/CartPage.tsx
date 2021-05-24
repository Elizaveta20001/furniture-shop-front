import {useSelector} from "react-redux";


export const CartPage: React.FC = () => {
    const data = useSelector((state: Store) => state.cartReducer.items)
    return (
        <div>
            {
                data.length === 0 ? <h1>Empty page</h1>
                    : data.map(element => <h1 key={element.title}>{element.title}: {element.quantity}</h1>)
            }
        </div>
    )
};