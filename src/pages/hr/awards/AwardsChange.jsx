import React, { useEffect, useState } from 'react'
import { addAward, getAward, updateAward } from '../../../http/api/awards.js'
import Button from '../../../components/ui/buttons/button/Button.jsx'
import { useLocation } from 'react-router-dom'

const AwardsChange = () => {
    const [data, setData] = useState({
        name: '',
        amount: '',
        id:0
    })

    const location = useLocation()
    useEffect(()=>{
        getAward(location.pathname.split('/').at(-1))
            .then(res=>{
                setData({
                    name:res.data.name,
                    amount:res.data.amount,
                    id:res.data.id
                })
            })
    },[])

    const update = async () => {
        await updateAward({ ...data, amount: +data.amount })
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
            <h1 className={'text-2xl font-medium mb-4'}>Update Reward</h1>
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
                <Button label={'Update'} primary onClick={update}  className={'mt-5'}/>

            </div>
        </div>
    )
}

export default AwardsChange
