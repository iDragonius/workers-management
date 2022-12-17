import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { deleteOvertime, getUserOvertimes } from '../../http/api/overtimes.js'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { h } from 'gridjs'
import { deletePermission } from '../../http/api/permissions.js'
import { toast } from 'react-toastify'

const WorkingHoursList = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    useEffect(() => {
        getUserOvertimes({ employeeId: user.employeeId }).then((res) => {
            const tempData = []
            res.data.map((overtime) => {
                tempData.push([
                    overtime.id,
                    overtime.date.slice(0, 10),
                    overtime.hourCount,
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
            columns={[
                'ID',
                'Date',
                'Hours',
                {
                    name: 'Delete',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white font-semibold bg-red-500 ',
                                onClick: () => {
                                    deleteOvertime(row.cells[0].data).then(
                                        () => {
                                            toast.success(
                                                'Additional Working hour successfully deleted!'
                                            )

                                            setData(
                                                data.filter((wrk) => {
                                                    return (
                                                        wrk[0] !==
                                                        +row.cells[0].data
                                                    )
                                                })
                                            )
                                        }
                                    )
                                },
                            },
                            'Delete'
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

export default WorkingHoursList
