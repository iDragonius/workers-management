import React, { useEffect, useState } from 'react'
import { addNonWorkingDay, getNonWorkingDay, updateNonWorkingDay } from '../../../http/api/calendarDays.js'
import { dayTypes } from '../../../config/index.js'
import Button from '../../../components/ui/buttons/button/Button.jsx'
import { useLocation } from 'react-router-dom'

const NonWorkingDaysChange = () => {
    const [data, setData] = useState({
        date: '',
        dayType: 1,
        id:0
    })
    const location = useLocation()
    useEffect(()=>{
        getNonWorkingDay(location.pathname.split('/').at(-1))
            .then(day=>{
                setData({
                    date:day.data.date.slice(0,10),
                    dayType: day.data.dayType,
                    id:+day.data.id
                })
            })
    },[])
    const update = async () => {
        await updateNonWorkingDay(data)
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
            <h1 className={'text-2xl font-medium mb-4'}>Update Calendar Day</h1>

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
                <Button label={'Update'} primary onClick={update} />
            </div>
        </div>
    )
}

export default NonWorkingDaysChange
