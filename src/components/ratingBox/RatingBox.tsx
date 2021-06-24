import React from "react";

import './ratingBox.css'

const RatingBox: React.FC<{ value: number }> = ({value}) => {

    let stars = new Array(5).fill(false);

    stars = stars.map((star, index) => {
        if (index  + 1 <= value) return true
        else return false
    })

    return(
        <div className="rating-item-stars">
            {
                stars.map((star, index) => (
                    <div key={index}>
                        {
                            star ? <i className="material-icons small">star</i>
                                : <i className="material-icons small">star_border</i>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default RatingBox;
