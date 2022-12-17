import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { addPermission } from '../../http/api/permissions.js'
import { permissionTypes } from '../../config/index.js'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { addVacation } from '../../http/api/vacation.js'
import { vacationTypes } from '../../config/vacationTypes.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const VacationAdd = () => {
    const user = useSelector(userData)
    const navigate = useNavigate()
    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        count: '',
        vacationType: 1,
        note: '',
    })
    const add = async () => {
        await addVacation({
            ...data,
            employeeId: user.employeeId,
        }).then(() => {
            toast.success('Vacation added successfully!')
            navigate('/vacation/list')
        })
    }
    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div
            className={
                'bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
            }
        >
            <h1 className={'text-2xl font-medium mb-4'}>Request Vacation</h1>
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
                <Button label={'Request'} primary onClick={add} />
            </div>
        </div>
    )
}

export default VacationAdd
