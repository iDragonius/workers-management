import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/adminSlice'
import {
    deletePermission,
    getUserPermissions,
} from '../../http/api/permissions.js'
import { Grid } from 'gridjs-react'
import { useLocation, useNavigate } from 'react-router-dom'
import statusChecker from '../../features/statusChecker.js'
import { h } from 'gridjs'
import Back from '../../components/ui/Back.jsx'
import { deleteIllness } from '../../http/api/illness.js'

const PermissionsListUser = () => {
    const [data, setData] = useState([])
    const [staticData, setStaticData] = useState([])
    const user = useSelector(userData)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        getUserPermissions(location.pathname.split('/').at(-1)).then((res) => {
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
        <div>
            <div className={'mb-2'}>
                <Back />
            </div>
            <div className={'py-2 px-5 bg-primary shadow-md rounded-md'}>
                <p className={'text-white text-lg'}>
                    {user.firstName} {user.lastName} permissions
                </p>
            </div>

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
                                        deletePermission(
                                            row.cells[0].data
                                        ).then(() =>
                                            setData(
                                                data.filter((perm) => {
                                                    return (
                                                        perm[0] !==
                                                        +row.cells[0].data
                                                    )
                                                })
                                            )
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
                                        console.log(
                                            staticData.find(
                                                (perm) =>
                                                    perm.id == row.cells[0].data
                                            )
                                        )
                                        if (
                                            +staticData.find(
                                                (perm) =>
                                                    perm.id == row.cells[0].data
                                            ).status > 1
                                        ) {
                                            navigate(
                                                `/permissions/edit/${row.cells[0].data}`
                                            )
                                        } else {
                                            navigate(
                                                `/permissions/check/${row.cells[0].data}`
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
        </div>
    )
}

export default PermissionsListUser
