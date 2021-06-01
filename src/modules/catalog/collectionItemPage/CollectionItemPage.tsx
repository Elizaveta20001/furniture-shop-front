import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

import {Loader} from "../../../components/loader/Loader";
import CollectionItemCard from "../../../components/collectionItemCard/CollectionItemCard";
import CommentForm from "../../../components/commentForm/CommentForm";
import CommentSection from "../../../components/commentSection/CommentSection";
import RatingItemForm from "../../../components/ratingForm/RatingItemForm";

import {fetchCollectionItem} from "./store/actions";
import {CollectionProps} from "../../../interfaces/interfaces";
import {uriForCollection} from "../constants";

import "./collectionItemPage.css";


const CollectionItemPage: React.FC<CollectionProps> = ({history}) => {

    const dispatch = useDispatch();
    const data = useSelector((state: Store) => state.catalogReducer.collectionItemReducer);

    let arrayPath = history.location.pathname.split("/");
    const id = +arrayPath[arrayPath.length - 1];
    const pathComment = `${uriForCollection}/${arrayPath[1]}/comment/${id}`;
    const pathRating = `${uriForCollection}/${arrayPath[1]}/rating/${id}`;


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
                            rating={data.rating}
                        />
                        : <Loader/>
                }
            </div>
            <div className='collection_page collection-item-comment'>
                <RatingItemForm url={pathRating}/>
            </div>
            <div className='collection_page collection-item-comment'>
                <CommentForm url={pathComment}/>
                {
                    data.isFetched && <CommentSection comments={data.comments}/>
                }
            </div>
        </div>
    )
};


export default withRouter(CollectionItemPage);