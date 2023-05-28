import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'

const alert = () => {
    const alertData = useSelector((state:any) => state.alert)
    
    if(alertData?.show){
        const message = alertData?.message?.split('/')[1]?.split(')')[0]?.split('-')?.join(...[' '])
        toast.error(`${message}`);
    }
    
  return (
    <div>
      <ToastContainer position='top-center'/>
    </div>
  )
}

export default alert
