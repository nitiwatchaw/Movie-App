import React from 'react'
import Favourite from './favourite/Favourite'
import Dislike from './dislike/Dislike'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import WatchLater from './watchLater/WatchLater'
const MyAccount = () => {
    return (
        <ContentWrapper>
            <Favourite />
            <Dislike />
            <WatchLater />
        </ContentWrapper>
    )
}

export default MyAccount