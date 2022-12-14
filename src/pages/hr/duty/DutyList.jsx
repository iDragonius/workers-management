import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { h } from 'gridjs'
import { Grid } from 'gridjs-react'
import { setCurrentUserData } from '../../../store/slices/adminSlice.js'
import { deleteDuty, getAllDuties } from '../../../http/api/duty.js'
import { getAllStates } from '../../../http/api/states.js'
import { deletePermission } from '../../../http/api/permissions.js'
import { toast } from 'react-toastify'

const DutyList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        getAllStates().then((states) => {
            getAllDuties().then((res) => {
                const temp = []
                res.data.map((duty) => {
                    temp.push([
                        duty.id,
                        duty.name,
                        duty.salary,
                        states.data.find((state) => state.id === duty.stateId)
                            .name,
                    ])
                })
                setData(temp)
            })
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
                'Name',
                'Salary',
                'State',
                {
                    name: 'Delete',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white font-semibold bg-red-500 ',
                                onClick: () => {
                                    deleteDuty(row.cells[0].data).then(() => {
                                        toast.success(
                                            'Duty successfully deleted!'
                                        )
                                        setData(
                                            data.filter((dty) => {
                                                return (
                                                    dty[0] !==
                                                    +row.cells[0].data
                                                )
                                            })
                                        )
                                    })
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
                                        `/hr/duty/change/${row.cells[0].data}`
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

export default DutyList
