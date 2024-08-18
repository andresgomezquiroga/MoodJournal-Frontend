import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRout = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true })
            localStorage.removeItem('token')
        }
    }, [token])
    return children
}

export default ProtectedRout
