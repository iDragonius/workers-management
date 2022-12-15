import React, { useEffect, useState } from 'react'
import { _, Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { changeStatus, fetchUsers } from '../../http/api/admin'
import { setCurrentUserData } from '../../store/slices/adminSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllEmployees } from '../../http/api/employee.js'

const StaffList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        getAllEmployees().then((res) => {
            const temp = []
            res.data.map((employee) => {
                let status =1;
                if(employee.status===1){
                    status=  h(
                        'p',
                        {
                            className:
                                'text-orange-400 font-semibold',

                        },
                        'Pending'
                    )
                } else if(employee.status===2){
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
                temp.push([employee.id, employee.name, employee.surname, status])
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
                'First Name',
                'Last Name',
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
