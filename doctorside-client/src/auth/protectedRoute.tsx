import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const protectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth)
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/doctor/login" state={{ from: location }} replace />
  }

  return children
}

export default protectedRoute
