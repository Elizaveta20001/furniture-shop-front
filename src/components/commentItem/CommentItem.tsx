import React from "react";

import {Comment} from "../../interfaces/interfaces";

import './commentItem.css';


const CommentItem: React.FC<Comment> = ({email,firstName, lastName, image, text, createdAt}) => {
    const date = new Date(createdAt);

    return (
        <div className="comment">
            <div className="profile-image">
                {
                    image ? <img className="circle z-depth-5" src={image} /> :
                        <i className="material-icons dp48 person-icon">person</i>
                }
            </div>
            <div className='comment-data-container'>
                <h6 className='comment-name'>
                    {firstName} {lastName}
                    <a className="email-icon" href={`mailto:${email}`}>
                        <i className="material-icons">email</i>
                    </a>
                </h6>
                <h6 className='comment-text'>{text}</h6>
                <h6 className='comment-date'>Created at: {date.toLocaleString()}</h6>
            </div>
        </div>
    )
};


export default CommentItem;
