import React from "react";
import {useSelector} from "react-redux";

import RatingStar from "../ratingStar/RatingStar";

import './ratingForm.css';


const RatingItemForm: React.FC<{url: string}> = ({url}) => {
    const user = useSelector((state: Store) => state.loginReducer.userId);

    const makeStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<RatingStar key={i} value={i} url={url}/>);
        }
        return stars;
    }

    return (

        <form className='rating-form'>
            {!!user
                ? <div>
                    <h4>Please rate the product</h4>
                    <div className='rating-form-stars'>
                        {
                            makeStars().map(element => element)
                        }
                    </div>
                </div>
                : <h4>You need to login to rate the product</h4>
            }
        </form>
    )
}


export default RatingItemForm;
