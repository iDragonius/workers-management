import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { getEmployee } from '../../http/api/employee.js'
import { toast } from 'react-toastify'
import { genderTypes } from '../../config/index.js'
import Back from '../../components/ui/Back.jsx'
import { setEmployeeStatus } from '../../http/api/notification.js'
import { notificationsData } from '../../store/slices/notificationSlice.js'
import { getAllDuties } from '../../http/api/duty.js'

const StaffCheck = () => {
    const user = useSelector(userData)
    const navigate = useNavigate()
    const notifications = useSelector(notificationsData)
    const [dutyData, setDutyData] = useState([])

    const [data, setData] = useState({
        name: '',
        surname: '',
        fatherName: '',
        finCode: '1',
        address: '',
        phone: '',
        gender: 1,
        birthDay: '',
        dailyWorkHour: '',
        previousExperienceYear: '',
        previousExperienceMonth: '',
        status: 1,
        dutyId: 1,
    })
    const change = async (status) => {
        let notificationId = notifications.find(
            (ntf) =>
                ntf.recordId === +location.pathname.split('/').at(-1) &&
                ntf.notificationType === 1
        ).id

        await setEmployeeStatus({
            data: { ...data, status },
            notificationId,
        }).then((res) => {
            if (res.status === 200) {
                toast.success(
                    `${data.name + ' ' + data.surname} request successfully ${
                        status === 2 ? 'accepted' : 'rejected'
                    }!`
                )

                navigate(-1)
            }
        })
    }
    const location = useLocation()
    useEffect(() => {
        getEmployee(location.pathname.split('/').at(-1)).then((res) => {
            setData({
                ...res.data,
                userId: res.data.userId,
                name: res.data.name,
                surname: res.data.surname,
                fatherName: res.data.fatherName,
                finCode: res.data.finCode,
                address: res.data.address,
                phone: res.data.phone,
                gender: res.data.gender,
                birthDay: res.data.birthDay.slice(0, 10),
                dailyWorkHour: res.data.dailyWorkHour,
                previousExperienceYear: res.data.previousExperienceYear,
                previousExperienceMonth: res.data.previousExperienceMonth,
                status: res.data.status,
            })
            getAllDuties().then((duties) => {
                const temp = []

                duties.data.map((duty) => {
                    temp.push({ value: duty.id, name: duty.name })
                })

                setDutyData(temp)
            })
        })
    }, [])

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Back />
            <div
                className={
                    'mt-2 bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>Worker info</h1>
                <div className={'flex'}>
                    <div className={'flex flex-col w-[250px] mr-10'}>
                        <div className={'flex flex-col mb-5 relative'}>
                            <label
                                className={
                                    'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                }
                            >
                                Name
                            </label>
                            <input
                                value={data.name}
                                name={'name'}
                                onChange={changeData}
                                type="text"
                                placeholder={'John'}
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
                                Surname
                            </label>
                            <input
                                value={data.surname}
                                name={'surname'}
                                onChange={changeData}
                                type="text"
                                placeholder={'Doe'}
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
                                Father Name
                            </label>
                            <input
                                value={data.fatherName}
                                name={'fatherName'}
                                onChange={changeData}
                                type="text"
                                placeholder={'Steve'}
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
                                FIN Code
                            </label>
                            <input
                                value={data.finCode}
                                name={'finCode'}
                                onChange={changeData}
                                type="text"
                                maxLength={7}
                                placeholder={'74SV24F'}
                                className={
                                    'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                }
                            />
                        </div>
                    </div>
                    <div className={'flex flex-col w-[250px] mr-10'}>
                        <div className={'flex flex-col mb-5 relative'}>
                            <label
                                className={
                                    'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                }
                            >
                                Address
                            </label>
                            <input
                                value={data.address}
                                name={'address'}
                                onChange={changeData}
                                type="text"
                                placeholder={'John'}
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
                                Phone
                            </label>
                            <input
                                value={data.phone}
                                name={'phone'}
                                onChange={changeData}
                                type="text"
                                placeholder={'Doe'}
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
                                Gender
                            </label>
                            <select
                                value={data.gender}
                                name={'gender'}
                                onChange={changeData}
                                placeholder={'Steve'}
                                className={
                                    'w-full bg-white py-[14px] px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                }
                            >
                                {genderTypes.map((gender) => (
                                    <option
                                        value={gender.value}
                                        key={gender.value}
                                    >
                                        {gender.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={'flex flex-col mb-5 relative'}>
                            <label
                                className={
                                    'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                }
                            >
                                Birthday
                            </label>
                            <input
                                value={data.birthDay}
                                name={'birthDay'}
                                onChange={changeData}
                                type="date"
                                className={
                                    'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                }
                            />
                        </div>
                    </div>
                    <div className={'flex flex-col w-[250px] mr-10'}>
                        <div className={'flex flex-col mb-5 relative'}>
                            <label
                                className={
                                    'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                }
                            >
                                Daily Work Hours
                            </label>
                            <input
                                value={data.dailyWorkHour}
                                name={'dailyWorkHour'}
                                onChange={changeData}
                                type="text"
                                placeholder={'John'}
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
                                Experience Year
                            </label>
                            <input
                                value={data.previousExperienceYear}
                                name={'previousExperienceYear'}
                                onChange={changeData}
                                type="number"
                                placeholder={'0'}
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
                                Experience Month
                            </label>
                            <input
                                value={data.previousExperienceMonth}
                                name={'previousExperienceMonth'}
                                onChange={changeData}
                                type="number"
                                placeholder={'0'}
                                className={
                                    'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                }
                            />
                        </div>
                        <div className={'flex flex-col mb-5 relative '}>
                            <label
                                className={
                                    'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                                }
                            >
                                Duty
                            </label>
                            <select
                                value={data.dutyId}
                                name={'dutyId'}
                                onChange={changeData}
                                className={
                                    'bg-white w-full py-4 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md outline-none'
                                }
                            >
                                {dutyData.map((type) => {
                                    return (
                                        <option
                                            value={type.value}
                                            key={type.value}
                                        >
                                            {type.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        className={
                            ' py-2 px-4 text-white bg-green-600 rounded-md  font-semibold mr-5'
                        }
                        onClick={() => change(2)}
                    >
                        Accept
                    </button>
                    <button
                        className={
                            'py-2 px-4 text-white bg-red-600 rounded-md font-semibold'
                        }
                        onClick={() => change(3)}
                    >
                        Reject
                    </button>
                </div>
            </div>
        </>
    )
}

export default StaffCheck
