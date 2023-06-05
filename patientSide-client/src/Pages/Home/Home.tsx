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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="mt-2 flex flex-grow">
        <Sidebar />
        <div className="flex-grow mx-2">
          <ErrorBoundary>
            <HomeBanner />
          </ErrorBoundary>
        </div>
      </div>
    </div>




  )
}

export default Home
