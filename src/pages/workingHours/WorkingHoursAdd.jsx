import React, { useEffect, useState } from 'react'
import { addOvertime } from '../../http/api/overtimes'
import Button from '../../components/ui/buttons/button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import dayjs from 'dayjs'
import { fetchUsers } from '../../http/api/admin.js'
import { useNavigate } from 'react-router-dom'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { setCurrentUserData } from '../../store/slices/adminSlice.js'

const WorkingHoursAdd = () => {
    useEffect(() => {
        fetchUsers().then((res) => {
            const tempData = []
            res.data.map((user) => {
                tempData.push([user.employeeId, user.firstName, user.lastName])
            })
            setData([...tempData])
        })
    }, [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    return (
        <Grid
            resizable={true}
            sort={true}
            search={true}
            data={data}
            width={'min-content'}
            columns={[
                'ID',
                'First Name',
                'Last Name',

                ,
                {
                    name: 'Actions',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white bg-primary',
                                onClick: () => {
                                    navigate(
                                        `/working-hours/add/${row.cells[0].data}`
                                    )
                                },
                            },
                            'Add'
                        )
                    },
                },
            ]}
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

export default WorkingHoursAdd
