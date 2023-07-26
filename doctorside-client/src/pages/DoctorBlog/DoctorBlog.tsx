import Blogs from "../../components/Blog/Blogs"
import Navbar from "../../components/Common/Navbar/Navbar"
import Sidebar from "../../components/Common/Sidebar/Sidebar"
import ErrorBoundary from "../../util/ErrorBoundary"


const DoctorBlog = () => {
    return (
        <>
            <ErrorBoundary>
                <Navbar />
            </ErrorBoundary>
            <ErrorBoundary>
                <Sidebar />
            </ErrorBoundary>
            <ErrorBoundary>
                <Blogs/>
            </ErrorBoundary>
        </>
    )
}
export default DoctorBlog
