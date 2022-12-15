import React from 'react'
import Section from '../../../components/pages/section/Section'
import { rolesEnums } from '../../../config'
import RoleCheckerUI from '../../../features/roles/RoleCheckerUI'

const Sections = ({ active, setActive }) => {
    return (
        <div className={'flex py-3'}>
            <Section
                name={'List'}
                path={'/vacation/list'}
                active={active}
                setActive={setActive}
            />
            <RoleCheckerUI routeRole={rolesEnums.HR}>
                <Section
                    name={'Admin List'}
                    path={'/vacation/admin-list'}
                    active={active}
                    setActive={setActive}
                />
            </RoleCheckerUI>
            <Section
                name={'Add'}
                path={'/vacation/add'}
                active={active}
                setActive={setActive}
            />
        </div>
    )
}

export default Sections
