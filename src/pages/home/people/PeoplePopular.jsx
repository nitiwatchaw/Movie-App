import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

import useFetch from '../../../hook/useFetch'
import PeopleCarousel from '../../../components/peopleCarousel/PeopleCarousel'
import soundEffect from '../../../assets/sound-effect.png'
import Img from '../../../components/lazyLoadImage/Img'
import './style.scss'
const Certificate = () => {



    const { data, loading } = useFetch(`/person/popular`)


    return (

        <div className='certificate'>

            <div className='carouselSection3'>
                <ContentWrapper>
                    <div className="opacity-layer-up">

                    </div>
                    <div className="backdrop-img">
                        <Img src={soundEffect} />
                    </div>
                    <div className="opacity-layer">

                    </div>
                    <span className='carouselTitle'>Popular Cast </span>

                </ContentWrapper>
                <PeopleCarousel data={data?.results} loading={loading} />


            </div>

        </div>

    )
}

export default Certificate