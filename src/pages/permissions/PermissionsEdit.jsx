import React, { useEffect, useState } from 'react'
import { permissionTypes } from '../../config/index.js'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import {
    addPermission,
    getPermission,
    updatePermission,
} from '../../http/api/permissions.js'
import { useLocation, useNavigate } from 'react-router-dom'
import Back from '../../components/ui/Back.jsx'
import { toast } from 'react-toastify'

const PermissionsEdit = () => {
    const user = useSelector(userData)

    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        count: '',
        permissionType: 1,
        employeeId: '',
        id: '',
    })
    const location = useLocation()
    useEffect(() => {
        getPermission(location.pathname.split('/').at(-1)).then((res) => {
            setData({
                startDate: res.data.startDate.slice(0, 10),
                endDate: res.data.endDate.slice(0, 10),
                permissionType: res.data.permissionType,
                count: res.data.count,
                employeeId: res.data.employeeId,
                id: res.data.id,
            })
        })
    }, [])
    const navigate = useNavigate()
    const update = async () => {
        await updatePermission({
            ...data,
            permissionType: +data.permissionType,
        }).then(() => {
            toast.success('Permission successfully edited!')
            navigate(-1)
        })
    }
    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Back />
            <div
                className={
                    ' mt-2 bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>
                    {location.pathname.split('/').at(-1)}№ Permission
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
                    <div className={'flex flex-col mb-5 relative'}>
                        <label
                            className={
                                'text-gray-500 font-medium  text-xs left-2 bg-white p-1 absolute -top-3'
                            }
                        >
                            End
                        </label>
                        <input
                            value={data.endDate}
                            name={'endDate'}
                            onChange={changeData}
                            type="date"
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
                    <Button label={'Update'} primary onClick={update} />
                </div>
            </div>
        </>
    )
}

export default PermissionsEdit
