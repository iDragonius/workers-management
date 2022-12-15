import React from 'react'
import Section from '../../../components/pages/section/Section'

const Sections = ({ active, setActive }) => {
    return (
        <div className={'flex py-3'}>
            <Section
                name={'Non Working Days'}
                path={'/hr/non-working-days/list'}
                active={active}
                setActive={setActive}
            />
            <Section
                name={'Duty'}
                path={'/hr/duty/list'}
                active={active}
                setActive={setActive}
            />
            <Section
                name={'State'}
                path={'/hr/state/list'}
                active={active}
                setActive={setActive}
            />
            <Section
                name={'Awards'}
                path={'/hr/awards/list'}
                active={active}
                setActive={setActive}
            />
        </div>
    )
}

export default Sections
