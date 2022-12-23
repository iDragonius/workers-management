import React, { useEffect, useState } from 'react'
import { getAllEmployees } from '../../http/api/employee.js'

import GenderBar from './GenderBar.jsx'
import StatusBar from './StatusBar.jsx'
import { getAllNonWorkingDays } from '../../http/api/calendarDays.js'
import CalendarDaysPie from './CalendarDaysPie.jsx'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getAllPermissions } from '../../http/api/permissions.js'
import { getAllOvertimes } from '../../http/api/overtimes.js'
import { getAllKeys } from '../../http/api/admin.js'
import KeysBarUsed from './KeysBar'
const Dashboard = () => {
    const [employees, setEmployees] = useState([])
    const [calendarDays, setCalendarDays] = useState([])
    const [keys, setKeys] = useState([])
    const [data, setData] = useState({
        permissions: 0,
        overtimes: 0,
        employees: 0,
        keys: 0,
    })
    const user = useSelector(userData)
    useEffect(() => {
        let temp = { permissions: 0, overtimes: 0, employees: 0, keys: 0 }
        getAllEmployees().then((res) => {
            setEmployees(res.data)
            temp.employees = res.data.length
        })

        getAllNonWorkingDays().then((res) => {
            setCalendarDays(res.data)
        })

        getAllPermissions().then((res) => {
            temp.permissions = res.data.length
        })
        getAllOvertimes().then((res) => {
            temp.overtimes = res.data.length
        })
        getAllKeys().then((res) => {
            setKeys(res.data)
            temp.keys = res.data.length
        })
        setData(temp)
    }, [])
    return (
        <div>
            <div className={'flex'}>
                <div
                    className={
                        'mt-2 rounded-md py-2 px-4 border border-primary w-max flex flex-col items-center mr-3'
                    }
                >
                    <h1 className={'text-lg text-primary font-semibold'}>
                        Workers
                    </h1>
                    <p>{data.employees}</p>
                </div>
                <div
                    className={
                        'mt-2 rounded-md py-2 px-4 border border-primary w-max flex flex-col items-center mr-3'
                    }
                >
                    <h1 className={'text-lg text-primary font-semibold'}>
                        Secret keys
                    </h1>
                    <p>{data.keys}</p>
                </div>

                <div
                    className={
                        'mt-2 rounded-md py-2 px-4 border border-primary w-max flex flex-col items-center mr-3'
                    }
                >
                    <h1 className={'text-lg text-primary font-semibold'}>
                        Permissions
                    </h1>
                    <p>{data.permissions}</p>
                </div>

                <div
                    className={
                        'mt-2 rounded-md py-2 px-4 border border-primary w-max flex flex-col items-center'
                    }
                >
                    <h1 className={'text-lg text-primary font-semibold'}>
                        Overtimes
                    </h1>
                    <p>{data.overtimes}</p>
                </div>
            </div>
            <div className={'flex'}>
                <div className={'w-[500px] h-[300px] mr-20'}>
                    <GenderBar data={employees} />
                </div>
                <div className={'w-[500px] h-[300px]'}>
                    <StatusBar data={employees} />
                </div>
            </div>
            <div className={'flex'}>
                <div className={'w-[500px] h-[300px]'}>
                    <CalendarDaysPie data={calendarDays} />
                </div>
                <div className={'w-[500px] h-[300px]'}>
                    <KeysBarUsed data={keys} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
