import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import HomeBanner from '../../components/HomeComponents/HomeBanner/HomeBanner'
import './Home.scss'
import { useDispatch } from 'react-redux'
import { hideAlert } from '../../config/Redux/alertSlice'
import ErrorBoundary from '../../util/ErrorBoundary'

const Home = () => {
  const dispatch = useDispatch()
  dispatch(hideAlert())
  return (
    <>
      <div className="container-home">
        <Navbar />
        <Sidebar />
        <ErrorBoundary>
           <HomeBanner />
        </ErrorBoundary>
      </div>
    </>
  )
}

export default Home
