import React, { useState } from 'react'
import { addOvertime } from '../../http/api/overtimes'
import Button from '../../components/ui/buttons/button/Button'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'

const WorkingHoursAdd = () => {
    const user = useSelector(userData)
    const [currDate, setCurrDate] = useState(new Date())
    const [hours, setHours] = useState(null)

    const add = async () => {
        if (typeof hours !== 'number') return

        await addOvertime({
            employeeId: user.employeeId,
            date: currDate,
            hourCount: +hours,
        })
    }
    return (
        <div
            className={
                'bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
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
                        value={currDate}
                        onChange={(e) => setCurrDate(e.target.value)}
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
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
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
    )
}

export default WorkingHoursAdd
