import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Section from '../../../components/pages/section/Section.jsx'

const Awards = () => {
    const [active, setActive] = useState('/hr/awards/list')
    const location = useLocation()
    useEffect(() => {
        setActive(location.pathname)
    }, [location.pathname])
    return <div>
        <div className={'mb-5 my-3'}>
            <Section name={'List'} active={active} setActive={setActive} path={'/hr/awards/list'} />
            <Section name={'Add'} active={active} setActive={setActive} path={'/hr/awards/add'} />
        </div>
        <Outlet/>
    </div>
}

export default Awards
