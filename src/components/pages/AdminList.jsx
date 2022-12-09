import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../../http/api/admin.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { setCurrentUserData } from '../../store/slices/adminSlice.js'

const AdminList = ({ path }) => {
    useEffect(() => {
        fetchUsers().then((res) => {
            const tempData = []
            res.data.map((user) => {
                tempData.push([user.id, user.firstName, user.lastName])
            })
            setData([...tempData])
        })
    }, [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    return (
        <Grid
            resizable={true}
            sort={true}
            search={true}
            data={data}
            width={'min-content'}
            columns={[
                'ID',
                'First Name',
                'Last Name',

                ,
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
                                        `/${path}/list/${row.cells[0].data}`
                                    )
                                    dispatch(
                                        setCurrentUserData({
                                            id: row.cells[0].data,
                                            firstName: row.cells[1].data,
                                            lastName: row.cells[2].data,
                                        })
                                    )
                                },
                            },
                            'Check'
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

export default AdminList
