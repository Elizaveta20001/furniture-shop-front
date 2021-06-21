import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {CommentFormProps} from "../../interfaces/interfaces";
import {templateFetch} from "../../helpers/templatePost";
import {fetchCollectionItem} from "../../modules/catalog/collectionItemPage/store/actions";

import './commentForm.css';


const CommentForm: React.FC<CommentFormProps> = ({url}) => {
    const [text, setText] = useState("");
    const user = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const dispatch = useDispatch();
    const history = useHistory();

    const refreshData = () => {
        dispatch(fetchCollectionItem(history.location.pathname));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            text,
            user,
            createdAt: Date()
        };
        templateFetch(url, data, token, refreshData);
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
