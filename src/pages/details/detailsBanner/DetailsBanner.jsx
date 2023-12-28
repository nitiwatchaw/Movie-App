import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import PosterFallback from "../../../assets/no-poster.png";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hook/useFetch.jsx";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import { PlayIcon } from "./Playbtn.jsx";
import { addFav, disFav, watchLater } from "../../../store/homeSlice.js";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";

const DetailsBanner = ({ video, crew }) => {

    const dispatch = useDispatch()

    const favArr = useSelector(state => state?.home?.favArr)
    const disFavArr = useSelector(state => state?.home?.disFavArr)
    const watchLaterData = useSelector(state => state?.home?.watchLater)

    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const { url } = useSelector(state => state.home)

    const _genres = data?.genres?.map((g) => g.id)

    const director = crew?.filter((f) => f.job === 'Director')
    const writer = crew?.filter((f) => f.job === 'ScreenPlay' || f.job === 'Story' || f.job === 'Writer')


    // Check if the current item is already in the favArr
    const isIdInFavorites = favArr.some((item) => item.id == id);

    const isIdInDisFavorites = disFavArr.some((item) => item.id == id);
    const isIdInwatchLaterData = watchLaterData.some((item) => item.id == id);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    const handleAddFav = () => {
        const payload = {
            ...data, mediaType: mediaType
        }
        dispatch(addFav(payload));
    }


    const hangledisAddFav = () => {
        const payload = {
            ...data, mediaType: mediaType
        }
        dispatch(disFav(payload));
    }

    const handleWatchLater = () => {
        const payload = {
            ...data, mediaType: mediaType
        }
        dispatch(watchLater(payload));
    }


    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {data && (
                        <>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>

                            <div className="opacity-layer">  </div>

                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img
                                                src={url.backdrop + data.poster_path}
                                                className="posterImg"
                                            />
                                        ) : (
                                            <Img
                                                src={PosterFallback}
                                                className="posterImg"
                                            />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data?.name || data?.title}
                                            (${dayjs(data?.release_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <CircleRating rating={data?.vote_average?.toFixed(1)} />
                                            <div
                                                onClick={() => { setShow(true); setVideoId(video.key) }}
                                                className="playbtn">
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>


                                            <div className={`favourite-icon`} title={`Like ${mediaType}`}>
                                                <button onClick={handleAddFav}>
                                                    {isIdInFavorites ? <AiFillLike style={{ color: 'var(--pink)' }} /> : <AiOutlineLike />}
                                                </button>
                                            </div>

                                            <div className={`favourite-icon`} title={`Dislike ${mediaType}`}>
                                                <button onClick={hangledisAddFav}>
                                                    {isIdInDisFavorites ? <BiSolidDislike style={{ color: 'var(--pink)' }} /> : <BiDislike />}
                                                </button>
                                            </div>

                                            <div className={`favourite-icon`} title={`Warch this ${mediaType} Later`}>
                                                <button onClick={handleWatchLater}>
                                                    {isIdInwatchLaterData ? <MdPlaylistAdd style={{ color: '#3effe9' }} /> : <MdPlaylistAdd />}
                                                </button>

                                            </div>


                                        </div>
                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{""}
                                                    </span>
                                                    <span className="text ">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{""}
                                                    </span>
                                                    <span className="text ">
                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Run Time:{""}
                                                    </span>
                                                    <span className="text ">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{""}
                                                </span>
                                                <span className="text">
                                                    {director.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length - 1 !== i && ','}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{""}
                                                </span>
                                                <span className="text">
                                                    {writer.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length - 1 !== i && ','}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{""}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data?.created_by - 1 !== i && ','}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>

                        </>
                    )}
                </>
            ) : (
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
            )
            }
        </div >
    );
};

export default DetailsBanner;