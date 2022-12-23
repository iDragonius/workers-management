import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import bussinessException from '../../features/bussinessException.js'
import Button from '../../components/ui/buttons/button/Button.jsx'
import Back from '../../components/ui/Back.jsx'
import { addOvertime } from '../../http/api/overtimes.js'

const WorkingHoursAddForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({
        date: dayjs().format('YYYY-MM-DD'),
        hourCount: '',
        employeeId: location.pathname.split('/').at(-1),
    })
    const add = async () => {
        await addOvertime(data)
            .then(() => {
                toast.success(`Overtime successfully added!`)
                navigate(-1)
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    bussinessException(err.response.data.Detail)
                }
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
                    'mt-3 bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>Add Overtime</h1>
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
                            type="date"
                            value={data.date}
                            name={'date'}
                            onChange={changeData}
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
                            Hour Count
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
                    <Button label={'Add'} primary onClick={add} />
                </div>
            </div>
        </>
    )
}

export default WorkingHoursAddForm
