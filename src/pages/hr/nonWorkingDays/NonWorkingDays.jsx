import * as React from 'react'
import Button from '../../../components/ui/buttons/button/Button.jsx'
import { useEffect, useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import Section from '../../../components/pages/section/Section.jsx'

const NonWorkingDays = () => {
    const [active, setActive] = useState('/hr/non-working-days/list')
    const location = useLocation()
    useEffect(() => {
        setActive(location.pathname)
    }, [location.pathname])
    return <div>
        <div className={'mb-5 my-3'}>
            <Section name={'List'} active={active} setActive={setActive} path={'/hr/non-working-days/list'} />
            <Section name={'Add'} active={active} setActive={setActive} path={'/hr/non-working-days/add'} />
        </div>
        <Outlet/>
    </div>
}

export default NonWorkingDays
