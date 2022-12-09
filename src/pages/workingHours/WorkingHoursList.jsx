import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'

const WorkingHoursList = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    useEffect(()=>{
        getUserOvertimes({employeeId: user.employeeId })
            .then(res=>{
                const tempData = []
                res.data.map(
                    overtime => {
                        tempData.push(
                            [
                                overtime.id,
                                overtime.date,
                                overtime.hourCount
                            ]
                        )
                    }
                )
                setData(tempData)
            })
    },[])
    return (
        <Grid
            resizable={true}
            sort={true}
            data={data}
            search={true}
            width={'max-content'}
            columns={['ID', 'Date', 'Hours']}
            style={{
                td: {
                    'min-width': '100px',
                },
            }}
            pagination={{
                limit: 5,
            }}
        />
    )
}

export default WorkingHoursList
