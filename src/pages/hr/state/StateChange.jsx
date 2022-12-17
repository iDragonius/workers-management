import React, { useEffect, useState } from 'react'
import {
    addState,
    getAllStates,
    getState,
    updateState,
} from '../../../http/api/states.js'
import Button from '../../../components/ui/buttons/button/Button.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import Back from '../../../components/ui/Back.jsx'
import { toast } from 'react-toastify'

const StateChange = () => {
    const [states, setStates] = useState([])
    const [data, setData] = useState({
        name: '',
        parentId: 1,
    })
    const location = useLocation()
    useEffect(() => {
        getAllStates().then((allStates) => {
            const temp = []
            allStates.data.map((state) => {
                if (state.parentId === 0) {
                    temp.push(state)
                }
            })
            setStates(temp)

            getState(location.pathname.split('/').at(-1)).then((res) => {
                setData({
                    name: res.data.name,
                    parentId: res.data.parentId,
                })
            })
        })
    }, [])
    const navigate = useNavigate()

    const update = async () => {
        await updateState({
            ...data,
            id: +location.pathname.split('/').at(-1),
        }).then(() => {
            toast.success('State successfully edited!')
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
                    'mt-2 bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>Update State</h1>
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
                        placeholder={'Office'}
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
                            Parent State
                        </label>
                        <select
                            value={data.parentId}
                            name={'parentId'}
                            onChange={changeData}
                            disabled={data.parentId === 0}
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
        </>
    )
}

export default StateChange
