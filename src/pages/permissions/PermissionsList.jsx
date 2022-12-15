import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import { getUserPermissions } from '../../http/api/permissions.js'
import { h } from 'gridjs'

const PermissionsList = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    useEffect(() => {
        getUserPermissions(user.employeeId).then((res) => {
            const tempData = []
            res.data.map((permission) => {
                let status =1;
                if(permission.status===1){
                    status=  h(
                        'p',
                        {
                            className:
                                'text-orange-400 font-semibold',

                        },
                        'Pending'
                    )
                } else if(permission.status===2){
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
    )
}

export default PermissionsList
