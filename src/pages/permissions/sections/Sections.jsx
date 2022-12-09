import React from 'react'
import Section from '../../../components/pages/section/Section'
import { rolesEnums } from '../../../config'
import RoleCheckerUI from '../../../features/roles/RoleCheckerUI'

const Sections = ({ active, setActive }) => {
    return (
        <div className={'flex py-3'}>
            <Section
                name={'List'}
                path={'/permissions/list'}
                active={active}
                setActive={setActive}
            />
            <RoleCheckerUI routeRole={rolesEnums.HR}>
                <Section
                    name={'Admin List'}
                    path={'/permissions/admin-list'}
                    active={active}
                    setActive={setActive}
                />
            </RoleCheckerUI>
            <Section
                name={'Add'}
                path={'/permissions/add'}
                active={active}
                setActive={setActive}
            />
        </div>
    )
}

export default Sections
