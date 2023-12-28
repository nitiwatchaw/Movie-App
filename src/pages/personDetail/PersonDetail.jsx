import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hook/useFetch'
import Img from '../../components/lazyLoadImage/Img'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useSelector } from 'react-redux'
import dayjs from "dayjs";
import PosterFallback from "../../assets/no-poster.png";
import KnowFotCarousel from '../../components/knownForCarousel/KnownForCarousel'

import './style.scss'

const PersonDetail = () => {

    const { data, loading } = useFetch(`/person/popular`)

    const { id } = useParams()

    const { url } = useSelector(state => state.home)
    const { data: people, loading: Peopleloading } = useFetch(`/person/${id}`)


    const posterUrl = people?.profile_path ?
        url?.poster + people?.profile_path :
        PosterFallback

    const generValue = people?.gender == 1 ? "femal" : "male"



    // Convert id to number if needed
    const numericId = parseInt(id, 10);

    // Filter data based on id
    const filteredData = data?.results.filter((e) => e.id === numericId);

    const filterDataKnowmFor = filteredData?.map(arr => arr.known_for)

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    console.log(people)

    return (
        <div className="personDetail">
            <div className="backdrop-img">
                <Img src={posterUrl} />
            </div>
            <ContentWrapper>

                {!Peopleloading ?
                    <div className="content">
                        <div className="posterBlock">
                            <Img src={posterUrl} />
                        </div>
                        <div className="detail">
                            <div className="name">
                                <p>{people?.name}</p>
                            </div>
                            <div className="knownAs">
                                <p className='head-knownAs'>Known as </p>
                                <div className='list'>
                                    {people?.also_known_as && people.also_known_as.length > 0 ? (
                                        people.also_known_as.map((alias, index) => (
                                            <span key={index}>{` ● ${alias} `}</span>
                                        ))
                                    ) : (
                                        <div className='noData'>No data..</div>
                                    )}

                                </div>
                            </div>
                            <div className="biography">
                                <p className='head-biography'>biography</p>
                                <p>{people?.biography ? people?.biography : <div className='noData'>No data..</div>}</p>
                            </div>
                            
                            <div className="text-group">
                                <div className="text">
                                    <p className='head-text'>Gender</p>
                                    <p>{generValue}</p>
                                </div>
                                <div className="text">
                                    <p className='head-text'>Place of birth</p>
                                    <p>{people?.place_of_birth ? people?.place_of_birth : <div className='noData'>No data..</div>}</p>
                                </div>
                                <div className="text">
                                    <p className='head-text'>Birthday</p>
                                    <p>{people?.birthday ? dayjs(people?.birthday).format("MMM D, YYYY") : <div className='noData'>No data..</div>}</p>
                                </div>
                                <div className="text">
                                    <p className='head-text'>Deathday</p>
                                    <p>{people?.deathday ? dayjs(people?.deathday).format("MMM D, YYYY") : "Alive"}</p>
                                </div>
                            </div>
                        </div>

                    </div> :
                    <div className="detailsBannerSkeleton">
                        <ContentWrapper>
                            <div className="left skeleton"></div>
                            <div className="right">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </ContentWrapper>
                    </div>
                }
                <>
                    <div className="knownFor">
                        <div className="head">
                            <p>Known For</p>
                        </div>
                        {!Peopleloading ?
                            <KnowFotCarousel data={filterDataKnowmFor} loading={loading} />
                            :
                            <div className="loadingSkeleton">
                                {skItem()}
                                {skItem()}
                                {skItem()}
                                {skItem()}
                                {skItem()}
                            </div>

                        }

                    </div>
                </>








            </ContentWrapper>




        </div>
    )
}

export default PersonDetail