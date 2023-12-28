import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import MovieCard from '../../../components/movieCard/MovieCard';

const Dislike = () => {


    const navigate = useNavigate()

    const disFavArr = useSelector(state => state?.home?.disFavArr)

    return (
        <div className='AccountPage dislike'>
            <div className="pageHeader">
                <div className="pageTitle">Dislike TV / Movie </div>
            </div>
            <div className="content">
                {disFavArr.length >= 1 ?
                    disFavArr.map(movie => {
                        return (
                            <MovieCard
                                key={movie.id}
                                data={movie}
                                mediaType={movie.mediaType}
                                onClick={() => { navigate(`/${movie.mediaType}/${movie.id}`) }}
                            />
                        )
                    })
                    : <div className='noItem' >
                        <p>No TV / Movie that you dislike... </p>
                    </div>}
            </div>
        </div>
    )
};

export default Dislike;
