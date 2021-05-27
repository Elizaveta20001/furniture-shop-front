import React from "react";

import {Comment} from "../../interfaces/interfaces";

import './commentItem.css';


const CommentItem: React.FC<Comment> = ({email, text, createdAt}) => {
    return(
        <div className="comment">
            <div>
                <i className="material-icons dp48 icon">person</i>
            </div>
            <div className='comment-data-container'>
                <h6 className='comment-email'>{email}</h6>
                <h6 className='comment-text'>{text}</h6>
                <h6 className='comment-date'>Created at: {createdAt}</h6>
            </div>
        </div>
    )
};


export default CommentItem;