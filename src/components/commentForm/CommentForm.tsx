import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";

import {CommentFormProps} from "../../interfaces/interfaces";
import {fetchComment} from "../../helpers/commentPost";

import './commentForm.css';


const CommentForm: React.FC<CommentFormProps> = ({history, url}) => {
    const [text, setText] = useState("");
    const user = useSelector((state: Store) => state.loginReducer.userId);

    const handleSubmit = async () => {
        const data = {
            text,
            user,
            createdAt: Date()
        }
        try{
            await fetchComment(url, data);
        }catch (error) {
            alert(error);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h4>Please add your comment here</h4>
            <textarea name="comment" cols={40} rows={3} className='comment-text-field' placeholder='Add your comment'
                      onChange={handleChange}/>
            {!!user
                ? <button className='waves-effect waves-light btn custom-button' type='submit'> Add comment</button>
                : <h5>You need to login to add comment</h5>
            }
        </form>
    )
};


export default withRouter(CommentForm);