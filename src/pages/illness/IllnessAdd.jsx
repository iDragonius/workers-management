import React, { useState } from 'react'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { addIllness } from '../../http/api/illness.js'

const IllnessAdd = () => {
    const user = useSelector(userData)

    const [sicknessData, setSicknessData] = useState({
        startDate: '',
        endDate: '',
        note: '',
        documentNumber: '',
        clinicName: '',
        payPercent: '',
    })
    const add = async () => {
        // add POST illness
        await addIllness({ ...sicknessData, employeeId: user.employeeId })
    }
    const changeData = (e) => {
        setSicknessData({ ...sicknessData, [e.target.name]: e.target.value })
    }
    return (
        <div
            className={
                'bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center mt-10'
            }
        >
            <h1 className={'text-2xl font-medium mb-4'}>Add Sickness</h1>
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
                                value={sicknessData.startDate}
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
                                value={sicknessData.endDate}
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
                                value={sicknessData.note}
                                name={'note'}
                                onChange={changeData}
                                rows={4}
                                placeholder={'The reason of permission is ...'}
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
                                value={sicknessData.documentNumber}
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
                                value={sicknessData.clinicName}
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
                                value={sicknessData.payPercent}
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
                <Button label={'Add'} primary onClick={add} />
            </div>
        </div>
    )
}

export default IllnessAdd
