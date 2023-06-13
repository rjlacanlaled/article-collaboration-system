import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'


const useAuth = () => {
  const user = { loggedIn: true }
  return user && user.loggedIn
}

function PrivateRoutes() {
  const isAuth = useAuth();
  return (
    isAuth ? <Outlet /> : <Navigate to="/"/>
  )
}

export default PrivateRoutes