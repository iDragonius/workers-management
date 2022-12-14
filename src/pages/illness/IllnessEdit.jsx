import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import {
    addIllness,
    getIllness,
    updateIllness,
} from '../../http/api/illness.js'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { getPermission } from '../../http/api/permissions.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Back from '../../components/ui/Back.jsx'

const IllnessEdit = () => {
    const user = useSelector(userData)
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        note: '',
        documentNumber: '',
        clinicName: '',
        payPercent: '',
        id: '',
        employeeId: '',
    })

    useEffect(() => {
        getIllness(location.pathname.split('/').at(-1)).then((res) => {
            setData({
                startDate: res.data.startDate.slice(0, 10),
                endDate: res.data.endDate.slice(0, 10),
                note: res.data.note,
                documentNumber: res.data.documentNumber,
                clinicName: res.data.clinicName,
                payPercent: res.data.payPercent,
                employeeId: res.data.employeeId,
                id: res.data.id,
            })
        })
    }, [])

    const update = async () => {
        await updateIllness(data).then(() => {
            toast.success('Bulleten successfully edited!')
            navigate(-1)
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
                    'bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center mt-10'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>
                    {' '}
                    {location.pathname.split('/').at(-1)}??? Disease Bulleten
                </h1>
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
                    <Button label={'Update'} primary onClick={update} />
                </div>
            </div>
        </>
    )
}

export default IllnessEdit
