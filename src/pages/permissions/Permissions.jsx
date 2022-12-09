import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sections from './sections/Sections.jsx'

const Permissions = () => {
    const [active, setActive] = useState('/permissions/list')
    const location = useLocation()

    useEffect(() => {
        setActive(location.pathname)
    }, [location])

    return (
        <div>
            <Sections active={active} setActive={setActive} />
            <Outlet />
        </div>
    )
}

export default Permissions
