import React, { useEffect, useState } from 'react'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import {
    addIllness,
    getIllness,
    updateIllness,
} from '../../http/api/illness.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { getEmployee } from '../../http/api/employee.js'
import { setNotificationStatus } from '../../http/api/notification.js'
import { notificationsData } from '../../store/slices/notificationSlice.js'
import { IoIosReturnLeft } from 'react-icons/io'
import notificationStatusChanger from '../../features/notificationStatusChanger.js'
import { updatePermission } from '../../http/api/permissions.js'

const IllnessCheck = () => {
    const user = useSelector(userData)
    const [currUser, setCurrUser] = useState({})
    const notifications = useSelector(notificationsData)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        note: '',
        documentNumber: '',
        clinicName: '',
        payPercent: '',
    })
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        getIllness(location.pathname.split('/').at(-1)).then((illness) => {
            setData({
                startDate: illness.data.startDate.slice(0, 10),
                endDate: illness.data.endDate.slice(0, 10),
                note: illness.data.note,
                documentNumber: illness.data.documentNumber,
                clinicName: illness.data.clinicName,
                payPercent: illness.data.payPercent,
            })
            getEmployee(illness.data.employeeId).then((user) => {
                setCurrUser(user.data)
            })
        })
    }, [])

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div
                className={
                    'py-3 px-5 bg-primary w-[700px] flex items-center rounded-md  mb-4 drop-shadow-md'
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
                    'bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center mt-4'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>Check Sickness</h1>
                <div className={'flex flex-col'}>
                    <div className={'flex'}>
                        <div className={'flex flex-col w-[250px] mr-10'}>
                            <div className={'flex flex-col mb-5 relative'}>
                                <label
                                    className={
                                        'text-gray-500 font-medium  text-xs left-2 bg-white p-1 absolute -top-3'
                                    }
                                >
                                    Start
                                </label>
                                <input
                                    value={data.startDate}
                                    name={'startDate'}
                                    onChange={changeData}
                                    type="date"
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
                                    Note
                                </label>
                                <textarea
                                    style={{ resize: 'none' }}
                                    value={data.note}
                                    name={'note'}
                                    onChange={changeData}
                                    rows={4}
                                    placeholder={
                                        'The reason of permission is ...'
                                    }
                                    className={
                                        'w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                    }
                                />
                            </div>
                        </div>
                        <div className={'flex flex-col w-[250px]'}>
                            <div className={'flex flex-col mb-5 relative'}>
                                <label
                                    className={
                                        'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                    }
                                >
                                    Document Number
                                </label>
                                <input
                                    value={data.documentNumber}
                                    name={'documentNumber'}
                                    onChange={changeData}
                                    type="text"
                                    placeholder={'1312512'}
                                    className={
                                        'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                    }
                                />
                            </div>
                            <div className={'flex flex-col mb-5 relative'}>
                                <label
                                    className={
                                        'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                    }
                                >
                                    Clinic Name
                                </label>
                                <input
                                    value={data.clinicName}
                                    name={'clinicName'}
                                    onChange={changeData}
                                    type="text"
                                    placeholder={'Dunyagoz'}
                                    className={
                                        'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                    }
                                />
                            </div>
                            <div className={'flex flex-col mb-5 relative'}>
                                <label
                                    className={
                                        'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                    }
                                >
                                    Pay Percent
                                </label>
                                <input
                                    value={data.payPercent}
                                    name={'payPercent'}
                                    onChange={changeData}
                                    type="text"
                                    placeholder={'20%'}
                                    className={
                                        'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={
                    'py-3 px-5 bg-primary w-[700px] flex justify-center items-center rounded-md  mt-4 drop-shadow-md'
                }
            >
                <button
                    onClick={() =>
                        notificationStatusChanger({
                            status: 2,
                            currUser,
                            data,
                            updateFnc: updateIllness,
                            route: 'illness',
                            notificationType: 2,
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
                            updateFnc: updateIllness,
                            route: 'illness',
                            notificationType: 2,
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

export default IllnessCheck
