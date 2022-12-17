import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { getVacation, updateVacation } from '../../http/api/vacation.js'
import { toast } from 'react-toastify'
import Back from '../../components/ui/Back.jsx'
import { vacationTypes } from '../../config/vacationTypes.js'
import Button from '../../components/ui/buttons/button/Button.jsx'

const VacationView = () => {
    const user = useSelector(userData)
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        count: '',
        vacationType: 1,
        note: '',
        employeeId: '',
        id: '',
    })

    useEffect(() => {
        getVacation(location.pathname.split('/').at(-1)).then((res) => {
            setData({
                startDate: res.data.startDate.slice(0, 10),
                endDate: res.data.endDate.slice(0, 10),
                count: res.data.count,
                vacationType: +res.data.vacationType,
                note: res.data.note,
                employeeId: res.data.employeeId,
                id: res.data.id,
            })
        })
    }, [])
    const add = async () => {
        await updateVacation(data).then(() => {
            toast.success('Vacation updated successfully!')
            navigate('/vacation/list')
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
                    'mt-2 bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>
                    {location.pathname.split('/').at(-1)}№ Vacation
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
                            readOnly={true}
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
                            readOnly={true}
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
                            disabled={true}
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
                            readOnly={true}
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
                </div>
            </div>
        </>
    )
}

export default VacationView
