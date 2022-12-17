import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import {
    deletePermission,
    getUserPermissions,
} from '../../http/api/permissions.js'
import { h } from 'gridjs'
import statusChecker from '../../features/statusChecker.js'
import { setCurrentUserData } from '../../store/slices/adminSlice.js'
import { useNavigate } from 'react-router-dom'
import { deleteIllness } from '../../http/api/illness.js'
import { toast } from 'react-toastify'

const PermissionsList = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    const [staticData, setStaticData] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getUserPermissions(user.employeeId).then((res) => {
            const tempData = []
            setStaticData(res.data)
            res.data.map((permission) => {
                tempData.push([
                    permission.id,
                    permission.permissionType == 1 ? 'Hour' : 'Day',
                    permission.count,
                    permission.startDate.slice(0, 10),
                    permission.endDate.slice(0, 10),
                    statusChecker(permission),
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
                'Type',
                'Count',
                'Start Date',
                'End Date',
                'Status',
                {
                    name: 'Delete',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white font-semibold bg-red-500 ',
                                onClick: () => {
                                    deletePermission(row.cells[0].data).then(
                                        () => {
                                            toast.success(
                                                'Permission successfully deleted!'
                                            )
                                            setData(
                                                data.filter((perm) => {
                                                    return (
                                                        perm[0] !==
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
                                    if (
                                        +staticData.find(
                                            (perm) =>
                                                perm.id == row.cells[0].data
                                        ).status > 1
                                    ) {
                                        navigate(
                                            `/permissions/view/${row.cells[0].data}`
                                        )
                                    } else {
                                        navigate(
                                            `/permissions/edit/${row.cells[0].data}`
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

export default PermissionsList
