import { useEffect } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { fetchDataFromApi } from './utils/api'
import { useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from '../src/components/footer/Footer'
import Home from './pages/home/Home'
import Details from '../src/pages/details/Details'
import SearchResultPage from './pages/searchResultPage/SearchResultPage'
import Explore from '../src/pages/explore/Explore'
import PageNotFounded from '../src/pages/404/pageNotFounded'
import MyAccount from './pages/myAccount/MyAccount'
import PersonDetail from './pages/personDetail/PersonDetail'
function App() {

  const dispatch = useDispatch()


  const fetchApiConfigure = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        console.log('configure API', res)

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"
        }

        // paste the data in url state of redux
        dispatch(getApiConfiguration(url))
      })

  }

  useEffect(() => {
    fetchApiConfigure()
    genresCall()
  }, [])


  const genresCall = async () => {
    let promises = []
    let endPoints = ['tv', "movie"]
    let allGenres = {}

    // เอา ข้อมูลจาก array endPoints  ไปใส่ใน array promises เพื่อทำการ loop data
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))

    })

    // Use Promise.all to wait for all promises in the array to resolve
    const data = await Promise.all(promises)


    // การเปลี่ยนไอดี object ใน arr ให้ตรงกับค่า id ขอตัวนั้นๆ
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }




  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResultPage />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/person/:id' element={<PersonDetail />} />
        <Route path='*' element={<PageNotFounded />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
