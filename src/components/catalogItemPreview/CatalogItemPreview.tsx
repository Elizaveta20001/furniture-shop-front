import {Link} from 'react-router-dom';

import './catalogItemPreview.css';


const CatalogItemPreview = ({title,url} : {title: string, url: string}): JSX.Element =>{
    return(
        <div className='card'>
            <div className='card-image'>
                <img src={url} alt=''/>
                <span className='card-title'><h3>{title}</h3></span>
            </div>
            <div className='card-action'>
                <Link 
                    to={title.toLowerCase()} 
                    className='waves-effect waves-light btn custom-button'
                > Show more</Link>
            </div>
        </div>
    )
}


export default CatalogItemPreview;