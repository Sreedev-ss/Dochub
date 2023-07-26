import ErrorBoundary from '../../util/ErrorBoundary'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Blogs from '../../components/BlogComponent/Blogs'

const Blog = () => {
    return (
        <div className="flex flex-col ">
            <ErrorBoundary>
                <Navbar />
            </ErrorBoundary>
            <div className="mt-2 lg:flex lg:flex-grow">
                <Sidebar />
                <div className="xs:flex md:flex-grow mx-2">
                    <ErrorBoundary>
                        <Blogs />
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    )
}

export default Blog
