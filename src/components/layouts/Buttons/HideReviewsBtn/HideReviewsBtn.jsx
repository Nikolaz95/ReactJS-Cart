import React from 'react'


import LoadMore from "../../../../assets/icons/icon-load.png"

import Button from '../Button'

const HideReviewsBtn = ({ hideReviews }) => {
    return (
        <Button variant="hideReviews" icon={LoadMore} onClick={hideReviews}>
            Hide Comments
        </Button>
    )
}

export default HideReviewsBtn