import React, { useEffect, useState } from 'react'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getOvertime, updateOvertime } from '../../http/api/overtimes.js'
import Back from '../../components/ui/Back.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const WorkingHoursEdit = () => {
    const user = useSelector(userData)
    const [data, setData] = useState({
        date: '',
        hourCount: '',
        employeeId: '',
        id: '',
    })
    const navigate = useNavigate()
    useEffect(() => {
        getOvertime(location.pathname.split('/').at(-1)).then((res) => {
            setData({
                date: res.data.date.slice(0, 10),
                hourCount: res.data.hourCount,
                employeeId: res.data.employeeId,
                id: res.data.id,
            })
        })
    }, [])
    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const update = async () => {
        await updateOvertime(data).then(() => {
            toast.success('Overtime successfully edited!')
            navigate(-1)
        })
    }

    return (
        <>
            <Back />
            <div
                className={
                    'mt-2 bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>Edit Overtime</h1>
                <div className={'flex flex-col w-[250px]'}>
                    <div className={'flex flex-col mb-5 relative'}>
                        <label
                            className={
                                'text-gray-500 font-medium  text-xs left-2 bg-white p-1 absolute -top-3'
                            }
                        >
                            Date
                        </label>
                        <input
                            value={data.date}
                            name={'date'}
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
                                'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                            }
                        >
                            Hours
                        </label>
                        <input
                            value={data.hourCount}
                            name={'hourCount'}
                            onChange={changeData}
                            type="text"
                            placeholder={'1'}
                            className={
                                'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                            }
                        />
                    </div>
                    <Button label={'Change'} primary onClick={update} />
                </div>
            </div>
        </>
    )
}

export default WorkingHoursEdit
