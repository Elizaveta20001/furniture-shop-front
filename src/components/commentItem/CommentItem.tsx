import React from "react";

import {Comment} from "../../interfaces/interfaces";

import './commentItem.css';


const CommentItem: React.FC<Comment> = ({email, text, createdAt}) => {
    return(
        <div className="comment">
            <h5>{email}</h5>
            <h5>{text}</h5>
            <h5>{createdAt}</h5>
        </div>
    )
};


export default CommentItem;