import React, { useState } from 'react'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { addIllness } from '../../http/api/illness.js'
import { dayTypes, permissionTypes } from '../../config/index.js'
import { addPermission } from '../../http/api/permissions.js'

const PermissionsAdd = () => {
    const user = useSelector(userData)

    const [data, setData] = useState({
        startDate: '',
        endDate: '',
        count: '',
        permissionType: '1',
    })
    const add = async () => {
        await addPermission({
            ...data,
            permissionType: +data.permissionType,
            employeeId: user.employeeId,
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
            <h1 className={'text-2xl font-medium mb-4'}>Request Permission</h1>
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
                        value={data.permissionsType}
                        name={'permissionType'}
                        onChange={changeData}
                        className={
                            'bg-white w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md outline-none'
                        }
                    >
                        {permissionTypes.map((type) => {
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
                        Count
                    </label>
                    <input
                        value={data.count}
                        name={'count'}
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
    )
}

export default PermissionsAdd
