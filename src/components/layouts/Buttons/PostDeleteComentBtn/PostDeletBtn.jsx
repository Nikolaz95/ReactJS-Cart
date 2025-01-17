import React, { useState } from 'react'


//import img
import RemoveComment from "../../../../assets/icons/icons-remove.png"
import PostComment from "../../../../assets/icons/icon-comment.png"

import Button from '../Button'

const PostDeletBtn = ({ review }) => {
    const [createComment, setCreateComment] = useState(false);

    const handleCreateComment = (reviewId) => {
        setCreateComment((prevReview) => ({
            ...prevReview,
            [reviewId]: !createComment[reviewId],
        }));
    };
    return (
        <Button onClick={() => handleCreateComment(review.reviewId)}
            variant={createComment[review.reviewId] ? 'removeReview' : 'postComment'}
            icon={createComment[review.reviewId] ? RemoveComment : PostComment}>
            <p>{createComment[review.reviewId] ? 'Delete Post' : 'Post'}</p>
        </Button>
    )
}

export default PostDeletBtn