import {UserComments} from "../../../../interfaces/interfaces";
import React from "react";
import CommentSection from "../../../../components/commentSection/CommentSection";
import './userProfileCommentsSubTab.css'
import CollectionItemCard from "../../../../components/collectionItemCard/CollectionItemCard";

interface UserProfileCommentsSubTabInterface {
    comments: UserComments[],
    user: any
}

export const UserProfileCommentsSubTab: React.FC<UserProfileCommentsSubTabInterface> = ({comments, user}): JSX.Element => {

    const commentItems = comments.map((item) => {
        return({
            ...item,
            comments: item.comments.map((commentItem) => {
                return({
                    ...commentItem,
                    image: user.image,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                })
            })
        })
    })

    return (
        <div className="user-profile-comment-section">
                {
                    commentItems.map((item, index) => (
                        <div className="user-profile-comment-item" key={index}>
                            <div className="user-profile-comment-subitem collection-item">
                                <CollectionItemCard
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    url={item.url}
                                    rating={item.rating}
                                />
                            </div>
                            <div className="user-profile-comment-subitem">
                                <CommentSection
                                    comments={item.comments}
                                />
                            </div>

                        </div>
                    ))
                }
        </div>
    )

}
