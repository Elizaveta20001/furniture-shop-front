import React from "react";

import './ratingBox.css'

const RatingBox: React.FC<{ value: number }> = ({value}) => {

    let stars = new Array(5).fill(0);
    const truncValue = Math.trunc(value);
    const roundValue = Math.round(value);

    stars = stars.map((star, index) => {
        if (index  + 1 <= value) return 1
        if (index + 1 === truncValue + 1 && roundValue === truncValue + 1) return 0.5
        return 0
    })

    return(
        <div className="rating-box">
            <div className="rating-stars">
                {
                    stars.map((star, index) => (
                        <div className="rating-star" key={index}>
                            {
                                star === 1 ? <i className="material-icons small">star</i>
                                    : (<div className="rating-star">
                                        {star === 0.5 ? <i className="material-icons small">star_half</i>
                                            : <i className="material-icons small">star_border</i>}
                                        </div>)
                            }
                        </div>
                    ))
                }

            </div>
            <div className='rating-label'>
                <h6>({value} of 5)</h6>
            </div>

        </div>
    )
}

export default RatingBox;
