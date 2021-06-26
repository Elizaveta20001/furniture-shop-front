import React from "react";


const EmptyUserProfileTab: React.FC<{text: string, iconName: string}> = ({text, iconName}) => {
    return(
        <div className="card-content">
            <div className="empty-cart">
                <div>
                    <h1>{text}</h1>
                </div>
                <div>
                    <i className="material-icons dp48 large">{iconName}</i>
                </div>
            </div>
        </div>
    )
}


export default EmptyUserProfileTab;
