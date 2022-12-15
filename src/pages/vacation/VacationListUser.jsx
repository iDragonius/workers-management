import React, { useEffect, useState } from 'react'
import { getUserVacations } from '../../http/api/vacation.js'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/adminSlice.js'
import { vacationTypes } from '../../config/vacationTypes.js'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { useNavigate } from 'react-router-dom'

const VacationListUser = () => {
    const user = useSelector(userData)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user.employeeId){
            navigate('/vacation/list')
            return
        }
        getUserVacations(user.employeeId).then((res) => {
            const tempData = []
            res.data.map((vacation) => {
                const type = vacationTypes.find(vType => vType.value === vacation.vacationType ).name
                tempData.push([
                    vacation.id,
                    vacation.startDate.slice(0, 10),
                    vacation.endDate.slice(0,10),
                    type
                ])
            })
            setData(tempData)
        })
    },[])
    return (
        <>
            <div className={'py-2 px-5 bg-primary shadow-md rounded-md'}>
                <p className={'text-white text-lg'}>
                    {user.firstName} {user.lastName} vacations
                </p>
            </div>
            <Grid
                resizable={true}
                sort={true}
                data={data}
                search={true}
                width={'max-content'}
                columns={['ID', 'Start', 'End', 'Type',                     {
                    name: 'Actions',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white bg-primary',
                                onClick: () => {
                                    navigate(`/vacation/check/${row.cells[0].data}`)
                                },
                            },
                            'Edit'
                        )
                    },
                }]}
                style={{
                    td: {
                        'min-width': '100px',
                    },
                }}
                pagination={{
                    limit: 5,
                }}
            />
        </>

    )
}

export default VacationListUser
