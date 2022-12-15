import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import { Grid } from 'gridjs-react'
import { getUserIllness } from '../../http/api/illness.js'
import { h } from 'gridjs'
import { setCurrentUserData } from '../../store/slices/adminSlice.js'
import { useNavigate } from 'react-router-dom'

const IllnessList = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getUserIllness({ employeeId: user.employeeId }).then((res) => {
            const tempData = []
            res.data.map((bulleten) => {
                let status
                if(bulleten.status===1){
                    status=  h(
                        'p',
                        {
                            className:
                                'text-orange-400 font-semibold',

                        },
                        'Pending'
                    )
                } else if(bulleten.status===2){
                    status=  h(
                        'p',
                        {
                            className:
                                'text-green-600 font-semibold',

                        },
                        'Accepted'
                    )
                } else {
                    status=  h(
                        'p',
                        {
                            className:
                                'text-red-600 font-semibold',

                        },
                        'Rejected'
                    )
                }

                tempData.push([bulleten.id, bulleten.startDate.slice(0,10), bulleten.endDate.slice(0,10), status])
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
            columns={[
                'ID',
                'Start',
                'End',
                'Status',
                {
                    name: 'Actions',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white bg-primary',
                                onClick: () => {
                                    dispatch(
                                        setCurrentUserData({
                                            employeeId: row.cells[0].data,
                                        })
                                    )
                                    navigate(
                                        `/staff/change/${row.cells[0].data}`
                                    )
                                },
                            },
                            'Edit'
                        )
                    },
                }
            ]}
            pagination={{
                limit: 5,
            }}
        />
    )
}

export default IllnessList
