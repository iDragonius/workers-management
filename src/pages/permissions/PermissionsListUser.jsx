import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/adminSlice'
import { getUserPermissions } from '../../http/api/permissions.js'
import { Grid } from 'gridjs-react'
import { useLocation, useNavigate } from 'react-router-dom'

const PermissionsListUser = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    const location = useLocation()
    useEffect(() => {
        getUserPermissions(location.pathname.split('/').at(-1)).then((res) => {
            const tempData = []
            res.data.map((permission) => {
                let status
                if (permission.status === 1) {
                    status = 'Pending'
                } else if (permission.status === 2) {
                    status = 'Accepted'
                } else status = 'Rejected'

                tempData.push([
                    permission.id,
                    permission.permissionType == 1 ? 'Hour' : 'Day',
                    permission.count,
                    permission.startDate.slice(0, 10),
                    permission.endDate.slice(0, 10),
                    status,
                ])
            })
            setData(tempData)
        })
    }, [])
    return (
        <div>
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
