import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs2 from '../../../components/switchTab2/switchTab2'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import soundEffect from '../../../assets/effect.svg'
import Img from '../../../components/lazyLoadImage/Img'
import './styles.scss'
const NowPlaying = () => {

    const [endpoint, setEndpoint] = useState("movie")
    const [endpoint2, setEndpoint2] = useState('now_playing')

    const { data, loading } = useFetch(`/${endpoint}/${endpoint2}`)


    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
        setEndpoint2(tab === 'Movies' ? 'now_playing' : 'airing_today')
    }

    return (

        <div className='trailer'>

            <div className='carouselSection2'>
                <ContentWrapper>
                    <div className="backdrop-img">
                        <Img src={soundEffect} />
                    </div>
                    <span className='carouselTitle'>Latest Trailers</span>
                    <SwitchTabs2
                        data={["Movies", "Tv Shows"]}
                        onTabChange={onTabChange}
                    />
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
            </div>

        </div>

    )
}

export default NowPlaying