import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import { Grid } from 'gridjs-react'
import { getUserIllness } from '../../http/api/illness.js'

const IllnessList = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    useEffect(() => {
        getUserIllness({ employeeId: user.employeeId }).then((res) => {
            const tempData = []
            res.data.map((overtime) => {
                tempData.push([overtime.id, overtime.date, overtime.hourCount])
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
            columns={[
                'ID',
                'Start',
                'End',
                'Days Count',
                'Note',
                'Document Number',
                'Clinic Name',
                'Pay percent',
            ]}
            pagination={{
                limit: 5,
            }}
        />
    )
}

export default IllnessList
