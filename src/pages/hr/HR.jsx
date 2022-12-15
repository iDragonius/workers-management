import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sections from './sections/Sections'

const HR = () => {
    const [active, setActive] = useState('/hr/non-working-days/list')
    const location = useLocation()
    useEffect(() => {
        setActive(location.pathname)
    }, [location.pathname])
    return (
        <div>
            <Sections active={active} setActive={setActive} />
            <Outlet />
        </div>
    )
}

export default HR
