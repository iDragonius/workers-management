import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllStates } from '../../../http/api/states.js'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import {
    deleteNonWorkingDay,
    getAllNonWorkingDays,
} from '../../../http/api/calendarDays.js'
import { dayTypes } from '../../../config/index.js'
import { deletePermission } from '../../../http/api/permissions.js'
import { toast } from 'react-toastify'

const NonWorkingDaysList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        getAllNonWorkingDays().then((days) => {
            const temp = []
            days.data.map((day) => {
                let dType = dayTypes.find(
                    (type) => type.value === day.dayType
                ).name
                temp.push([day.id, day.date.slice(0, 10), dType])
            })
            setData(temp)
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
                'Day Type',
                {
                    name: 'Delete',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white font-semibold bg-red-500 ',
                                onClick: () => {
                                    deleteNonWorkingDay(row.cells[0].data).then(
                                        () => {
                                            toast.success(
                                                'Non Working Day successfully deleted!'
                                            )
                                            setData(
                                                data.filter((nwd) => {
                                                    return (
                                                        nwd[0] !==
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
                                        `/hr/non-working-days/change/${row.cells[0].data}`
                                    )
                                },
                            },
                            'Edit'
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

export default NonWorkingDaysList
