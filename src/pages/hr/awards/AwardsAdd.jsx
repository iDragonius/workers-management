import React, { useState } from 'react'
import Button from '../../../components/ui/buttons/button/Button.jsx'
import { addAward } from '../../../http/api/awards.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AwardsAdd = () => {
    const [data, setData] = useState({
        name: '',
        amount: '',
    })

    const navigate = useNavigate()

    const add = async () => {
        await addAward({ ...data, amount: +data.amount }).then(() => {
            toast.success('Award successfully added!')
            navigate(-1)
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
            <h1 className={'text-2xl font-medium mb-4'}>Add Reward</h1>
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
                    placeholder={'Activity'}
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
                    Amount
                </label>
                <input
                    value={data.amount}
                    name={'amount'}
                    onChange={changeData}
                    type="number"
                    placeholder={'1250'}
                    className={
                        'w-full py-3 px-3 border  hover:border-primary border-b-4 border-b-primary shadow-md rounded-md outline-none'
                    }
                />
                <Button
                    label={'Add'}
                    primary
                    onClick={add}
                    className={'mt-5'}
                />
            </div>
        </div>
    )
}

export default AwardsAdd
