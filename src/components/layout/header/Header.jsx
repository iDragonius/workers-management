import React, { useEffect, useState } from 'react'
import { RiAdminLine } from 'react-icons/ri'
import { IoMdNotificationsOutline } from 'react-icons/io'
import Notifications from './components/Notifications'
import LinkButton from './components/LinkButton'
import { useSelector } from 'react-redux'
import { userData } from '../../../store/slices/authSlice'
import { CgProfile } from 'react-icons/cg'
import { wiseWords } from '../../../shared'
import RoleCheckerUI from '../../../features/roles/RoleCheckerUI'
import { rolesEnums } from '../../../config'

const Header = () => {
    const [proverb, setProver] = useState('')

    useEffect(() => {
        const randomProverbIndex = Math.floor(Math.random() * wiseWords.length)
        setProver(wiseWords[randomProverbIndex])
    }, [])
    return (
        <div
            className={
                'bg-bgPrimary z-[1000] sticky top-0 pt-4  w-full flex justify-between items-center px-2 pb-4 mt-2 border-b-[1px] border-b-[rgba(0,0,0,0.1)]'
            }
        >
            <div>
                <h1 className={'text-2xl font-bold'}>Have a good day !</h1>
                <p className={'opacity-60'}>{proverb}</p>
            </div>
            <div className={'flex'}>
                <RoleCheckerUI routeRole={rolesEnums.ADMIN}>
                    <LinkButton
                        path={'/admin/users-list'}
                        icon={<RiAdminLine size={24} color={'#000'} />}
                        whiteIcon={<RiAdminLine size={24} color={'#fff'} />}
                    />
                </RoleCheckerUI>
                <LinkButton
                    path={'/profile/main-info'}
                    icon={<CgProfile size={24} color={'#000'} />}
                    whiteIcon={<CgProfile size={24} color={'#fff'} />}
                />
                <RoleCheckerUI routeRole={rolesEnums.HR}>
                    <Notifications
                        icon={
                            <IoMdNotificationsOutline
                                size={24}
                                color={'#000'}
                            />
                        }
                    />
                </RoleCheckerUI>
            </div>
        </div>
    )
}

export default Header
