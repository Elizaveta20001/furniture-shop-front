import React from "react";

import {templateFetch} from "../../helpers/templatePost";

import './ratingStar.css';


const RatingStar: React.FC<{ url: string, value: number }> = ({url, value}) => {
    const handleClick = async() => {
        await templateFetch(url, value);
    }

    return (
        <div>
            <i className="material-icons dp48 star" onClick={handleClick}>star_border</i>
        </div>
    )
}


export default RatingStar;