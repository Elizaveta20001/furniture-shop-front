import React from "react";
import RatingBox from "../ratingBox/RatingBox";

import './ratingItem.css';

const RatingItem: React.FC<{ item: any }> = ({item}) => {

    return (
        <div className="rating-item">
            <div className="rating-item-image-container">
                <img alt={item.title} src={item.url}/>
            </div>
            <div className="rating-item-data">
                <h5>{item.title}</h5>
            </div>
            <RatingBox value={item.rating[0].value}/>
        </div>
    )
}


export default RatingItem;
