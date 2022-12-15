import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUserData, userData } from '../../store/slices/adminSlice.js'
import { h } from 'gridjs'
import { useLocation } from 'react-router-dom'
import { getEmployee } from '../../http/api/employee.js'

const WorkingHoursListUser = () => {
    const [data, setData] = useState([])
    const user = useSelector(userData)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user.employeeId) {
            getEmployee(location.pathname.split('/').at(-1)).then((res) => {
                dispatch(
                    setCurrentUserData({
                        employeeId: res.data.id,
                        firstName: res.data.name,
                        lastName: res.data.surname,
                    })
                )
            })
        }
        getUserOvertimes({
            employeeId: location.pathname.split('/').at(-1),
        }).then((res) => {
            const temp = []
            res.data.map((overtime) => {
                temp.push([
                    overtime.id,
                    overtime.date.slice(0, 10),
                    overtime.hourCount,
                ])
            })
            setData(temp)
        })
    }, [])

    return (
        <>
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
                    'Date',
                    'Hours',
                    {
                        name: 'Actions',
                        formatter: (cell, row) => {
                            return h(
                                'button',
                                {
                                    className:
                                        'py-2  px-4 border rounded-md text-white bg-primary',
                                    onClick: () => {},
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
        </>
    )
}

export default WorkingHoursListUser
