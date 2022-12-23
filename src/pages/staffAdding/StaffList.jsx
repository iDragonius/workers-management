import React, { useEffect, useState } from 'react'
import { _, Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { changeStatus, fetchUsers } from '../../http/api/admin'
import { setCurrentUserData } from '../../store/slices/adminSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    changeStatusEmployee,
    getAllEmployees,
} from '../../http/api/employee.js'
import statusChecker from '../../features/statusChecker.js'
import cn from 'classnames'

const StaffList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState([])
    const [staticData, setStaticData] = useState([])
    useEffect(() => {
        getAllEmployees().then((res) => {
            const temp = []
            setStaticData(res.data)
            res.data.map((employee) => {
                temp.push([
                    employee.id,
                    employee.name,
                    employee.surname,
                    statusChecker(employee),
                    employee.status,
                ])
            })
            setData(temp)
        })
    }, [refresh])

    return (
        <Grid
            resizable={true}
            sort={true}
            data={data}
            search={true}
            width={'max-content'}
            columns={[
                'ID',
                'First Name',
                'Last Name',
                'Status',
                {
                    name: 'Status',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className: cn(
                                    'py-2  px-4 border rounded-md text-white',
                                    cell === 2 && 'bg-red-500',
                                    cell === 3 && 'bg-green-500',
                                    cell === 1 && 'bg-orange-500'
                                ),
                                disabled: cell === 1,
                                onClick: () => {
                                    if (cell === 2) {
                                        changeStatusEmployee({
                                            employeeId: +row.cells[0].data,
                                            status: false,
                                        }).then((res) => {
                                            if (res.status === 200) {
                                                setRefresh(!refresh)
                                            }
                                        })
                                    } else if (cell === 3) {
                                        changeStatusEmployee({
                                            employeeId: +row.cells[0].data,
                                            status: true,
                                        }).then((res) => {
                                            if (res.status === 200) {
                                                setRefresh(!refresh)
                                            }
                                        })
                                    }
                                },
                            },
                            cell === 2
                                ? 'Deactive'
                                : cell === 3
                                ? 'Active'
                                : 'Pending'
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
                                    dispatch(
                                        setCurrentUserData({
                                            employeeId: row.cells[0].data,
                                        })
                                    )
                                    if (
                                        +staticData.find(
                                            (empl) =>
                                                empl.id == row.cells[0].data
                                        ).status > 1
                                    ) {
                                        navigate(
                                            `/staff/change/${row.cells[0].data}`
                                        )
                                    } else {
                                        navigate(
                                            `/staff/check/${row.cells[0].data}`
                                        )
                                    }
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

export default StaffList
