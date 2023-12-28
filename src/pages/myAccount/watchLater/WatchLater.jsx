import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import MovieCard from '../../../components/movieCard/MovieCard';

const WatchLater = () => {


  const navigate = useNavigate()

  const watchLaterData = useSelector(state => state?.home?.watchLater)

  return (
    <>
      <div className='AccountPage dislike'>
        <div className="pageHeader">
          <div className="pageTitle"> Watch Later </div>
        </div>
        <div className="content">
          {watchLaterData.length >= 1 ?
            watchLaterData.map(movie => {
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
              <p>No TV / Movie for watch later </p>
            </div>}
        </div>
      </div>
    </>
  )
};

export default WatchLater;
