import { useDispatch } from 'react-redux'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import { hideAlert } from '../../config/Redux/alertSlice'

const Home = () => {
    const dispatch = useDispatch()
    dispatch(hideAlert())
    return (
        <>
            <Navbar />
            <Sidebar />
        </>
    )
}

export default Home
