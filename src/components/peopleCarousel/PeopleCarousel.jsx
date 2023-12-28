import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import "./style.scss";
import PosterFallback from "../../assets/no-poster.png";

const PeopleCarousel = ({ data, loading, title, }) => {

    const carouselContainer = useRef();

    const { url } = useSelector(state => state.home)
    const navigate = useNavigate()

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };


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

  


    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => { navigation('left') }}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => { navigation('right') }}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {

                            const posterUrl = item.profile_path ?
                                url.poster + item.profile_path :
                                PosterFallback

                            const generValue = item.gender == 1 ? "femal" : "male"

                            return (
                                <div key={item.id}
                                    className="carouselItem"
                                    onClick={() => { navigate(`/person/${item.id}`) }}
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                    </div>
                                  
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            <p>Known for department  <span>{item.known_for_department}</span></p>
                                        </span>
                                        <span className="gender">{generValue}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default PeopleCarousel