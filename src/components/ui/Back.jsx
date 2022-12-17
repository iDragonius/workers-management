import React from 'react'
import { IoIosReturnLeft } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate()

    return (
        <div
            className={
                ' py-2 px-3 w-max bg-white flex items-center rounded-md shadow-md cursor-pointer mr-4 '
            }
            onClick={() => navigate(-1)}
        >
            <IoIosReturnLeft size={32} color={'#377DFF'} />
            <span className={'text-[#377DFF] text-lg font-semibold ml-1 '}>
                Back
            </span>
        </div>
    )
}

export default Back
