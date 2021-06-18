import {UserComments} from "../../../../interfaces/interfaces";
import React from "react";
import CommentSection from "../../../../components/commentSection/CommentSection";

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
        <div>
            {
                commentItems.map((item, index) => (
                    <div key={index}>
                        {item.title}
                        <CommentSection
                            comments={item.comments}
                        />
                    </div>
                ))
            }

        </div>
    )

}
