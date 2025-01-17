import React, { useState } from 'react'

//import images
import DefaultAdd from "../../../../assets/icons/icon-add.png"
import AddWatchList from "../../../../assets/icons/icon-check.png"
import DefaultFav from "../../../../assets/icons/not-favoritIcon.png"
import AddFavoritList from "../../../../assets/icons/icon-like.png"
import Button from '../Button'

//import components


const AddToBtns = () => {
    /* add watch list fav list */
    const [isOnWatchList, setIsOnWatchList] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleWatchList = () => {
        setIsOnWatchList(!isOnWatchList);
    }

    const handleFavoritList = () => {
        setIsFavorite(!isFavorite);
    }
    return (
        <>
            <Button onClick={handleWatchList}
                variant={isOnWatchList ? 'removeWatchList' : 'addWatchList'}
                icon={isOnWatchList ? AddWatchList : DefaultAdd}>
                <p>{isOnWatchList ? 'on WatchList' : 'Add to WatchList'}</p>
            </Button>
            <Button onClick={handleFavoritList}
                variant={isFavorite ? 'removeFavList' : 'addFavList'}
                icon={isFavorite ? AddFavoritList : DefaultFav}>
                <p>{isFavorite ? 'on FavoritList' : 'Add to Favorit List'}</p>
            </Button>
        </>
    )
}

export default AddToBtns