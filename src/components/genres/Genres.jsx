import React from 'react'
import { useSelector } from 'react-redux'
import typeColors from './colorGenres'
import './style.scss'
const Genres = ({ data }) => {

    const { genres } = useSelector(state => state.home)
  
    return (
        <div className='genres'>
            {data?.map((g) => {

                //* ทำการ match กัน ระหว่าง id ของ genres ต่างๆ กับ id ของ movie ที่มี id ของ genres อยู่
                return (
                    <div className='genre' style={{ backgroundColor: typeColors[genres[g]?.name] }} key={g}>
                        {genres[g]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres