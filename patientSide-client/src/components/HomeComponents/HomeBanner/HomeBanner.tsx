import React from 'react'
import './HomeBanner.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'


const HomeBanner = () => {
  const userData = useSelector((state: any) => state.auth)
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <div className="HomePage">
        <h1 className='font-medium text-2xl mt-2 lg:flex lg:mx-3 md:mx-auto tracking-widest'>Welcome {userData?.user?.name?.split(' ').join('')} &#128522;</h1>
        <main className="my-3">
        <div className="container mx-auto px-6">
            <div className="h-64 rounded-md overflow-hidden bg-cover bg-center bnrImg" >
                <div className="bg-gray-900 bg-opacity-50 flex items-center justify-center h-full">
                    <div className="px-10 flex justify-center items-center flex-col max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">Welcome to Doctor Hub</h2>
                        <p className="mt-2 text-gray-400">Book appointments, consult with doctors, and get the healthcare you need.</p>
                        <button className="flex max-w-xs items-center justify-center mt-4 m-0 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <span onClick={()=>navigate('/doctors')}>Book Now</span>
                            <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
        
      </div>
    </React.Fragment>
  )
}

export default HomeBanner
