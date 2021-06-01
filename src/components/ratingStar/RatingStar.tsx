import React from "react";
import {useSelector} from "react-redux";

import {templateFetch} from "../../helpers/templatePost";

import './ratingStar.css';


const RatingStar: React.FC<{ url: string, value: number }> = ({url, value}) => {
    const userId = useSelector((state: Store) => state.loginReducer.userId);


    const handleClick = async () => {
        try{
            await templateFetch(url, {value: value, userId: userId});
            alert('You have successfully rated the product.');
        }
        catch (error) {
            alert('Error - You cannot rate the product more than once.');
        }
    }

    return (
        <div>
            <button type='submit' className="material-icons dp48 star" onClick={handleClick}>star_border</button>
        </div>
    )
}


export default RatingStar;