import React from "react";
import {Link} from "react-router-dom";
const CatalogItemPreview = ({title,url} : {title: string, url: string}): JSX.Element =>{
    return(
        <div className='card'>
            <div className='card-image'>
                <img src={url}/>
                <span className='card-title'><h3>{title}</h3></span>
            </div>
            <div className='card-action'>
                <Link to={title.toLowerCase()} className='waves-effect waves-light btn blue'> Show more</Link>
            </div>
        </div>
    )
}
export default CatalogItemPreview;