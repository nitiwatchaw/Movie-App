import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hook/useFetch'
import { useSelector } from 'react-redux'
import './style.scss'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {

    const navigate = useNavigate()

    // get all properties in url comefrm app.jsx
    const { url } = useSelector((state) => state.home)

    const [backgound, setBackground] = useState('')
    const [query, setQuery] = useState('')


    // hook from useFetch
    const { data, loading } = useFetch('/movie/upcoming')


    useEffect(() => {


        const randomIndex = Math.floor(Math.random() * 20);
        const randomResult = data?.results?.[randomIndex];


        if (randomResult) {
            const bg = url.backdrop + randomResult.backdrop_path;


            setBackground(bg || url.backdrop + data.results[0].backdrop_path);
        }
    }, [data, url.backdrop]);


    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    const searchQueryHandlerByClick = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner'>


            {!loading &&
                <div className='backdrop-img'>
                    <Img src={backgound} />
                </div>}

            <div className="opacity-layer">

            </div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={searchQueryHandlerByClick}>Search</button>
                    </div>
                </div>
            </ContentWrapper>


        </div>
    )
}

export default HeroBanner