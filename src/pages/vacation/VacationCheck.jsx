import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosReturnLeft } from 'react-icons/io'
import { vacationTypes } from '../../config/vacationTypes.js'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getVacation, updateVacation } from '../../http/api/vacation.js'
import { setNotificationStatus } from '../../http/api/notification.js'
import { notificationsData } from '../../store/slices/notificationSlice.js'
import { getEmployee } from '../../http/api/employee.js'
import notificationStatusChanger from '../../features/notificationStatusChanger.js'
import { updatePermission } from '../../http/api/permissions.js'
const VacationCheck = () => {
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(userData)
    const notifications = useSelector(notificationsData)
    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        vacationType: 1,
        note: '',
    })

    useEffect(() => {
        getVacation(location.pathname.split('/').at(-1)).then((vacation) => {
            setData({
                startDate: vacation.data.startDate.slice(0, 10),
                endDate: vacation.data.endDate.slice(0, 10),
                vacationType: +vacation.data.vacationType,
                note: vacation.data.note,
                id: vacation.data.id,
                employeeId: vacation.data.employeeId,
            })

            getEmployee(vacation.data.employeeId).then((user) => {
                setCurrUser(user.data)
            })
        })
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
                    Request Vacation
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
                            value={data.vacationType}
                            name={'vacationType'}
                            onChange={changeData}
                            className={
                                'bg-white w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md outline-none'
                            }
                        >
                            {vacationTypes.map((type) => {
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
                            Note
                        </label>
                        <textarea
                            value={data.note}
                            name={'note'}
                            onChange={changeData}
                            rows={5}
                            placeholder={'note for request'}
                            className={
                                'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                            }
                        />
                    </div>
                    <div
                        className={
                            'py-3 px-5 bg-primary  flex justify-center items-center rounded-md  mt-4 drop-shadow-md'
                        }
                    >
                        <button
                            onClick={() =>
                                notificationStatusChanger({
                                    status: 2,
                                    currUser,
                                    data,
                                    updateFnc: updateVacation,
                                    route: 'vacation',
                                    notifications,
                                    navigate,
                                    dispatch,
                                    notificationType: 4,
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
                                    updateFnc: updateVacation,
                                    route: 'vacation',
                                    notifications,
                                    navigate,
                                    dispatch,
                                    notificationType: 4,
                                })
                            }
                            className={
                                'py-2 px-5 bg-red-600  text-white font-semibold rounded-md '
                            }
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VacationCheck
