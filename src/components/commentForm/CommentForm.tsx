import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import {useSelector} from "react-redux";

import {CommentFormProps} from "../../interfaces/interfaces";
import {fetchComment} from "../../helpers/commentPost";

import './commentForm.css';


const CommentForm: React.FC<CommentFormProps> = ({history,url}) => {
    const [text,setText] = useState("");
    const user = useSelector((state:Store) => state.loginReducer.userId);

    const handleSubmit = async () =>{
        let data = {
            text,
            user,
            createdAt: Date()
        }
        fetchComment(url,data).then(() => console.log("OK"))
            .catch((error) => console.log(error))
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setText(event.target.value);
    }
    return(
            <div>
            <h4>Please add your comment here</h4>
            <textarea name="comment" cols={40} rows={3} className='comment-text-field' placeholder='Add your comment' onChange={handleChange}/>
            <button className='waves-effect waves-light btn custom-button' onClick={handleSubmit}> Add comment</button>
            </div>
    )
};


export default withRouter(CommentForm);