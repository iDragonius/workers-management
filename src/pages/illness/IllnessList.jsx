import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { Grid } from 'gridjs-react'
import { deleteIllness, getUserIllness } from '../../http/api/illness.js'
import { h } from 'gridjs'
import { setCurrentUserData } from '../../store/slices/adminSlice.js'
import { useNavigate } from 'react-router-dom'
import statusChecker from '../../features/statusChecker.js'
import { toast } from 'react-toastify'

const IllnessList = () => {
    const [data, setData] = useState([])
    const [staticData, setStaticData] = useState([])

    const user = useSelector(userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getUserIllness({ employeeId: user.employeeId }).then((res) => {
            const tempData = []
            setStaticData(res.data)
            res.data.map((bulleten) => {
                tempData.push([
                    bulleten.id,
                    bulleten.startDate.slice(0, 10),
                    bulleten.endDate.slice(0, 10),
                    statusChecker(bulleten),
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
                'Start',
                'End',
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
                                    deleteIllness(row.cells[0].data).then(
                                        () => {
                                            toast.success(
                                                'Disease bulleten successfully deleted!'
                                            )
                                            setData(
                                                data.filter((disease) => {
                                                    return (
                                                        disease[0] !==
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
                                    dispatch(
                                        setCurrentUserData({
                                            employeeId: row.cells[0].data,
                                        })
                                    )

                                    if (
                                        +staticData.find(
                                            (bulleten) =>
                                                bulleten.id == row.cells[0].data
                                        ).status > 1
                                    ) {
                                        navigate(
                                            `/illness/view/${row.cells[0].data}`
                                        )
                                    } else {
                                        navigate(
                                            `/illness/edit/${row.cells[0].data}`
                                        )
                                    }
                                },
                            },
                            'Edit'
                        )
                    },
                },
            ]}
            pagination={{
                limit: 5,
            }}
        />
    )
}

export default IllnessList
