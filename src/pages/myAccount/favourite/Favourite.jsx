import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import MovieCard from '../../../components/movieCard/MovieCard';

const Favourite = () => {


    const navigate = useNavigate()

    const favArr = useSelector(state => state?.home?.favArr)

    return (
        <>
            <div className='AccountPage'>
                <div className="pageHeader">
                    <div className="pageTitle">My Favourite </div>
                </div>
                <div className="content">
                    {favArr.length >= 1 ?
                        favArr.map(movie => {
                            return (
                                <MovieCard
                                    key={movie.id}
                                    data={movie}
                                    mediaType={movie.mediaType}
                                    onClick={() => { navigate(`/${movie.mediaType}/${movie.id}`) }}
                                />
                            )
                        })
                        : <div className='noItem'>
                            <p>No TV / Movie that you like </p>
                        </div>}
                </div>
            </div>
        </>
    )
};

export default Favourite;
