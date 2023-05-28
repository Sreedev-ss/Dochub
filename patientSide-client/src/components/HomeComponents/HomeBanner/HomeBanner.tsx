import React from 'react'
import './HomeBanner.scss'
import { useSelector } from 'react-redux'


const HomeBanner = () => {
  const userData = useSelector((state: any) => state.auth)
  return (
    <React.Fragment>
      <div className="HomePage">
        <h1 className='font-medium text-2xl mt-2 flex justify-start mx-3 tracking-widest'>Welcome {userData?.user?.name.split(' ').join('')} &#128522;</h1>
        <div className="banner flex justify-between items-center bg-white px-10 ml-1 mr-3 mt-3">
          <div className=''>
            <h1 className='font-medium text-gray-600 text-xl tracking-widest'>Get Response For Your Health problems</h1>
            <button className='bg-red-400 flex justify-start text-white p-2 m-2 rounded-sm'>Find a Doctor</button>
          </div>
          <img className='bannerImg' src="/bannerDoctor.png" alt="" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeBanner
