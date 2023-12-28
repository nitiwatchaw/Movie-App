import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
    name: 'counter',
    initialState: {
        url: {},
        genres: {},
        favArr: localStorage.getItem('favMovie') ? JSON.parse(localStorage.getItem('favMovie')) : [],
        disFavArr: localStorage.getItem('divfavMovie') ? JSON.parse(localStorage.getItem('divfavMovie')) : [],
        watchLater: localStorage.getItem('watchLater') ? JSON.parse(localStorage.getItem('watchLater')) : [],
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload
        },
        addFav: (state, action) => {
            const { id } = action.payload;
            const itemIndex = state.favArr.findIndex(item => item.id === id)
            if (itemIndex < 0) {
                state.favArr = [
                    {
                        ...action.payload,
                        favAdd: true,
                    },
                    ...state.favArr
                ];

                const movieArr = state.disFavArr.filter(
                    movie => movie.id !== id
                )
                state.disFavArr = movieArr;
            } else {
                // remove from arry
                state.favArr.splice(itemIndex, 1);
            }
            localStorage.setItem('favMovie', JSON.stringify(state.favArr))
            localStorage.setItem('divfavMovie', JSON.stringify(state.disFavArr))
        },
        disFav: (state, action) => {
            const { id } = action.payload;
            const itemIndexDisFav = state.disFavArr.findIndex(item => item.id === id)

            if (itemIndexDisFav < 0) {
                state.disFavArr = [
                    {
                        ...action.payload,
                        favAdd: false,
                    },
                    ...state.disFavArr,];

                const movieArr = state.favArr.filter(
                    movie => movie.id !== id
                )
                state.favArr = movieArr;
            } else {
                state.disFavArr.splice(itemIndexDisFav, 1);
            }

            localStorage.setItem('favMovie', JSON.stringify(state.favArr))
            localStorage.setItem('divfavMovie', JSON.stringify(state.disFavArr))
        },
        watchLater: (state, action) => {
            const { id } = action.payload;
            const itemIndex = state.watchLater.findIndex(item => item.id === id)
            if (itemIndex < 0) {
                state.watchLater = [
                    {
                        ...action.payload
                    },
                    ...state.watchLater
                ];
            } else {
                state.watchLater.splice(itemIndex, 1);
            }
            localStorage.setItem('watchLater', JSON.stringify(state.watchLater))
        }
    },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres, addFav, disFav, watchLater } = homeSlice.actions

export default homeSlice.reducer