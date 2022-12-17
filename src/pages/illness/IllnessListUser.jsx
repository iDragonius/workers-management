import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteIllness, getUserIllness } from '../../http/api/illness.js'
import statusChecker from '../../features/statusChecker.js'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import Back from '../../components/ui/Back.jsx'

const IllnessListUser = () => {
    const [data, setData] = useState([])
    const [staticData, setStaticData] = useState([])
    const user = useSelector(userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        getUserIllness({
            employeeId: location.pathname.split('/').at(-1),
        }).then((res) => {
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
        <>
            <Back />
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
                                            () =>
                                                setData(
                                                    data.filter((disease) => {
                                                        return (
                                                            disease[0] !==
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
                                        if (
                                            +staticData.find(
                                                (bulleten) =>
                                                    bulleten.id ==
                                                    row.cells[0].data
                                            ).status > 1
                                        ) {
                                            navigate(
                                                `/illness/edit/${row.cells[0].data}`
                                            )
                                        } else {
                                            navigate(
                                                `/illness/check/${row.cells[0].data}`
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
        </>
    )
}

export default IllnessListUser
