import React, { useState } from 'react'
import { dayTypes } from '../../../config/index.js'
import Button from '../../../components/ui/buttons/button/Button.jsx'
import { addNonWorkingDay } from '../../../http/api/calendarDays.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const NonWorkingDaysAdd = () => {
    const [data, setData] = useState({
        date: dayjs().format('YYYY-MM-DD'),
        dayType: 1,
    })
    const navigate = useNavigate()

    const add = async () => {
        await addNonWorkingDay({ ...data, dayType: +data.dayType }).then(() => {
            toast.success('Non Working day successfully added!')
            navigate(-1)
        })
    }
    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div
            className={
                'bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center mt-10'
            }
        >
            <h1 className={'text-2xl font-medium mb-4'}>Add Non Working Day</h1>

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

                <div className={'flex flex-col mb-5 relative '}>
                    <label
                        className={
                            'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                        }
                    >
                        Type
                    </label>
                    <select
                        name={'dayType'}
                        value={data.dayType}
                        onChange={changeData}
                        placeholder={'The reason of permission is ...'}
                        className={
                            'bg-white w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md outline-none'
                        }
                    >
                        {dayTypes.map((type) => {
                            return (
                                <option value={type.value} key={type.value}>
                                    {type.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <Button label={'Add'} primary onClick={add} />
            </div>
        </div>
    )
}

export default NonWorkingDaysAdd
