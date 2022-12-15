import React, { useEffect, useState } from 'react'
import Section from '../../../components/pages/section/Section.jsx'
import { Outlet, useLocation } from 'react-router-dom'

const Duty = () => {
    const [active, setActive] = useState('/hr/duty/list')
    const location = useLocation()
    useEffect(() => {
        setActive(location.pathname)
    }, [location.pathname])
    return <div>
        <div className={'mb-5 my-3'}>
            <Section name={'List'} active={active} setActive={setActive} path={'/hr/duty/list'} />
            <Section name={'Add'} active={active} setActive={setActive} path={'/hr/duty/add'} />
        </div>
        <Outlet/>
    </div>
}

export default Duty
