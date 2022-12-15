import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import { Grid } from 'gridjs-react'
import { getUserVacations } from '../../http/api/vacation.js'
import { vacationTypes } from '../../config/vacationTypes.js'

const VacationList = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    useEffect(() => {
        getUserVacations( user.employeeId ).then((res) => {
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
    }, [])
    return (
        <Grid
            resizable={true}
            sort={true}
            data={data}
            search={true}
            width={'max-content'}
            columns={['ID', 'Start', 'End', 'Type']}
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

export default VacationList
