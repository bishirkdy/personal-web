import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
const Authenticate = () => {
    const {user} = useSelector((state) => state.auth)
    if(!user){
        return <Navigate to="/login" replace/>
    }
  return (
    <>
    <Outlet/>
    </>
  )
}

export default Authenticate