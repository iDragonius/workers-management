import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { addDuty, getDuty, updateDuty } from '../../../http/api/duty.js'
import { getAllStates } from '../../../http/api/states.js'
import Button from '../../../components/ui/buttons/button/Button.jsx'

const DutyChange = () => {
    const location = useLocation()
    const [data, setData] = useState({
        name: '',
        salary: '',
        stateId: 1,
    })
    const [states, setStates] = useState([])
    useEffect(()=>{
        getDuty(location.pathname.split('/').at(-1))
            .then(res=>{
                setData({
                    name: res.data.name,
                    salary: res.data.salary,
                    stateId: res.data.stateId,
                })
                getAllStates()
                    .then(allStates=>{
                        setStates(allStates.data)
                    })
            })
    },[])
    const update = async () => {
        await updateDuty({ ...data, salary: +data.salary, id:+location.pathname.split('/').at(-1) })
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
            <h1 className={'text-2xl font-medium mb-4'}>Add duty</h1>
            <div className={'flex flex-col mb-5 relative'}>
                <label
                    className={
                        'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                    }
                >
                    Name
                </label>
                <input
                    value={data.name}
                    name={'name'}
                    onChange={changeData}
                    type="text"
                    placeholder={'Developer'}
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
                    Salary
                </label>
                <input
                    value={data.salary}
                    name={'salary'}
                    onChange={changeData}
                    type="number"
                    placeholder={'1250'}
                    className={
                        'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                    }
                />
            </div>

            <div className={'flex flex-col w-[250px]'}>
                <div className={'flex flex-col mb-5 relative '}>
                    <label
                        className={
                            'text-gray-500 font-medium text-xs left-2 bg-white p-1 absolute -top-3'
                        }
                    >
                        State
                    </label>
                    <select
                        value={data.stateId}
                        name={'stateId'}
                        onChange={changeData}
                        className={
                            'bg-white w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md outline-none'
                        }
                    >
                        {states.map((state) => {
                            return (
                                <option value={state.id} key={state.id}>
                                    {state.name}
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

export default DutyChange
