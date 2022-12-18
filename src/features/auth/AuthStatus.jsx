import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userStatus } from '../../store/slices/authSlice.js'

const AuthStatus = () => {
    const location = useLocation()
    const status = useSelector(userStatus)
    return status === 2 ? (
        <Outlet />
    ) : (
        <Navigate to="/" sate={{ from: location }} replace />
    )
}

export default AuthStatus
