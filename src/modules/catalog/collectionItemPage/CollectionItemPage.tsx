import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

import {Loader} from "../../../components/loader/Loader";
import CollectionItemCard from "../../../components/collectionItemCard/CollectionItemCard";
import CommentItem from "../../../components/commentItem/CommentItem";
import CommentForm from "../../../components/commentForm/CommentForm";

import {fetchCollectionItem} from "./store/actions";
import {CollectionProps} from "../../../interfaces/interfaces";
import {uriForCollection} from "../constants";

import "./collectionItemPage.css";


const CollectionItemPage: React.FC<CollectionProps> = ({history}) => {

    const dispatch = useDispatch();
    const data = useSelector((state: Store) => state.catalogReducer.collectionItemReducer);

    let arrayPath = history.location.pathname.split("/");
    const id = +arrayPath[arrayPath.length - 1];
    const path = `${uriForCollection}/${arrayPath[1]}/comment/${id}`;

    useEffect(() => {
        dispatch(fetchCollectionItem(history.location.pathname));
    }, [dispatch, history.location.pathname]);

    return (
        <div>
            <div className='collection_page collection-item-data'>
                {
                    data.isFetched ?
                        <CollectionItemCard
                            id={id}
                            description={data.description}
                            price={data.price}
                            url={data.url}
                            title={data.title}
                        />
                        : <Loader/>
                }
            </div>
            <div className='collection_page collection-item-comment'>
                <CommentForm url={path}/>
                {
                    data.isFetched || data.comments.length !== 0 ?
                        data.comments.map(element => <CommentItem
                            id={element.id}
                            text={element.text}
                            createdAt={element.createdAt}
                            email={element.email}
                            key={element.id}
                        />)
                        : <h3>Not comment</h3>
                }
            </div>
        </div>
    )
};


export default withRouter(CollectionItemPage);