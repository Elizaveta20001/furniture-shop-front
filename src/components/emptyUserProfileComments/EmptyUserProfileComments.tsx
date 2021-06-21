import React from "react";


const EmptyUserProfileComments: React.FC = () => {
    return(
        <div className="card-content">
            <div className="empty-cart">
                <div>
                    <h1>You haven't left any comments so far</h1>
                </div>
                <div>
                    <i className="material-icons dp48 large">comment</i>
                </div>
            </div>
        </div>
    )
}


export default EmptyUserProfileComments;
