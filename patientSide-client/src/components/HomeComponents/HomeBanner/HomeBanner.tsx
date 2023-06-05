import React from 'react'
import './HomeBanner.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const HomeBanner = () => {
  const userData = useSelector((state: any) => state.auth)
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <div className="HomePage">
        <h1 className='font-medium text-2xl mt-2 flex justify-start mx-3 tracking-widest'>Welcome {userData?.user?.name?.split(' ').join('')} &#128522;</h1>
        <div className="banner flex justify-between bg-white px-10 ml-1 mr-3 mt-3">
          <div className='flex flex-col md:items-start lg:items-start sm:items-center  justify-center'>
            <h1 className='font-medium text-gray-600 md:text-xl sm:text-sm hidden sm:block '>Get Response For Your Health problems</h1>
            <button onClick={()=>navigate('/doctors')} className='bg-red-400 hidden sm:block md:block text-white p-2 m-2 rounded-sm'>Find a Doctor</button>
          </div>
          <div className="flex flex-col">
            <img className='bannerImg' src="/bannerDoctor.png" alt="" />
            <button onClick={()=>navigate('/doctors')} className='bg-red-400 justify-start sm:hidden xs:block md:hidden text-white p-2 m-2 rounded-sm'>Find a Doctor</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeBanner
