import React from "react";
import Carousel from "../../components/carousel/Carousel";
import useFetch from "../../hook/useFetch";


const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );


    return (
        data?.results?.lenght >= 1
            ?
            <Carousel
                title="Recommendations"
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />
            :
            null
    );
};

export default Recommendation;