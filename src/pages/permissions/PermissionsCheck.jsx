import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPermission, updatePermission } from '../../http/api/permissions.js'
import { permissionTypes } from '../../config/index.js'
import { notificationsData } from '../../store/slices/notificationSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { getEmployee } from '../../http/api/employee.js'

import { IoIosReturnLeft } from 'react-icons/io'
import notificationStatusChanger from '../../features/notificationStatusChanger.js'
const PermissionsCheck = () => {
    const [currUser, setCurrUser] = useState({})
    const notifications = useSelector(notificationsData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        startDate: '',
        count: '',
        permissionType: 1,
        employeeId: 0,
        id: 0,
    })
    const location = useLocation()
    useEffect(() => {
        getPermission(location.pathname.split('/').at(-1)).then(
            (permission) => {
                setData({
                    startDate: permission.data.startDate.slice(0, 10),
                    count: permission.data.count,
                    permissionType: +permission.data.permissionType,
                    id: permission.data.id,
                    employeeId: permission.data.employeeId,
                })

                getEmployee(permission.data.employeeId).then((user) => {
                    setCurrUser(user.data)
                })
            }
        )
    }, [location.pathname.split('/').at(-1)])

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div
                className={
                    'py-3 px-5 bg-primary w-max flex items-center rounded-md  mb-4 drop-shadow-md'
                }
            >
                <div
                    className={
                        ' py-2 px-3 w-max bg-white flex items-center rounded-md shadow-md cursor-pointer mr-4 '
                    }
                    onClick={() => navigate(-1)}
                >
                    <IoIosReturnLeft size={32} color={'#377DFF'} />
                    <span
                        className={'text-[#377DFF] text-lg font-semibold ml-1 '}
                    >
                        Back
                    </span>
                </div>

                <p className={'text-white text-lg font-semibold mr-2'}>
                    {currUser.name} {' ' + currUser.surname}
                </p>
                <span className={'text-white text-lg'}>
                    asked for permission
                </span>
            </div>
            <div
                className={
                    'bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>
                    Check Permission
                </h1>
                <div className={'flex flex-col w-[250px]'}>
                    <div className={'flex flex-col mb-5 relative'}>
                        <label
                            className={
                                'text-gray-500 font-medium  text-xs left-2 bg-white p-1 absolute -top-3'
                            }
                        >
                            Start
                        </label>
                        <input
                            type="date"
                            value={data.startDate}
                            name={'startDate'}
                            onChange={changeData}
                            className={
                                'w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md  outline-none'
                            }
                        />
                    </div>
                    <div className={'flex flex-col mb-5 relative '}>
                        <label
                            className={
                                'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                            }
                        >
                            Type
                        </label>
                        <select
                            value={data.permissionType}
                            name={'permissionType'}
                            onChange={changeData}
                            className={
                                'bg-white w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md outline-none'
                            }
                        >
                            {permissionTypes.map((type) => {
                                return (
                                    <option value={type.value} key={type.value}>
                                        {type.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className={'flex flex-col mb-5 relative'}>
                        <label
                            className={
                                'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                            }
                        >
                            Count
                        </label>
                        <input
                            value={data.count}
                            name={'count'}
                            onChange={changeData}
                            type="text"
                            placeholder={'1'}
                            className={
                                'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                            }
                        />
                    </div>
                </div>
            </div>
            <div
                className={
                    'py-3 px-5 bg-primary w-[410px] flex justify-center items-center rounded-md  mt-4 drop-shadow-md'
                }
            >
                <button
                    onClick={() =>
                        notificationStatusChanger({
                            status: 2,
                            currUser,
                            data,
                            updateFnc: updatePermission,
                            route: 'permissions',
                            notificationType: 3,
                            notifications,
                            navigate,
                            dispatch,
                        })
                    }
                    className={
                        'py-2 px-5 bg-green-500 mr-4 text-white font-semibold rounded-md'
                    }
                >
                    Confirm
                </button>
                <button
                    onClick={() =>
                        notificationStatusChanger({
                            status: 3,
                            currUser,
                            data,
                            updateFnc: updatePermission,
                            route: 'permissions',
                            notificationType: 3,
                            notifications,
                            navigate,
                            dispatch,
                        })
                    }
                    className={
                        'py-2 px-5 bg-red-600  text-white font-semibold rounded-md '
                    }
                >
                    Reject
                </button>
            </div>
        </>
    )
}

export default PermissionsCheck
