import React from "react";

import {Comment} from "../../interfaces/interfaces";
import CommentItem from "../commentItem/CommentItem";

import './commentSection.css';


const CommentSection: React.FC<{comments: Comment[]}> = ({comments}) =>{

    return(
        <div>
            <div className="number-of-comments">
                <h5>Comments: {comments.length}</h5>
            </div>
            {
                comments.length !== 0 ?
                    comments.map(element => <CommentItem
                        id={element.id}
                        text={element.text}
                        createdAt={element.createdAt}
                        email={element.email}
                        image={element.image}
                        firstName={element.firstName}
                        lastName={element.lastName}
                        key={element.id}
                    />)
                    : <h3>Not comment</h3>
            }
        </div>
    )
};


export default CommentSection;
