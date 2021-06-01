import React, {useState} from "react";
import {useSelector} from "react-redux";

import {CommentFormProps} from "../../interfaces/interfaces";
import {templateFetch} from "../../helpers/templatePost";

import './commentForm.css';


const CommentForm: React.FC<CommentFormProps> = ({url}) => {
    const [text, setText] = useState("");
    const user = useSelector((state: Store) => state.loginReducer.userId);

    const handleSubmit = async () => {
        const data = {
            text,
            user,
            createdAt: Date()
        };
        try {
            await templateFetch(url, data);
            alert('Your comment has been successfully recorded.');
        } catch (error) {
            alert('Error');
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


export default CommentForm;