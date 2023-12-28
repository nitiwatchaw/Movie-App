import React from 'react'

import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import NowPlaying from './nowPlaying/NowPlaying'
import Certificate from './people/PeoplePopular'
const Home = () => {
    return (
        <div className='homePage'>
            <HeroBanner />
            <NowPlaying />
            <Trending />
            <Popular />
            <TopRated />
            <Certificate />
        </div>
    )
}

export default Home