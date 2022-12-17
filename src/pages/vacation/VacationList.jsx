import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../../store/slices/authSlice.js'
import { getUserOvertimes } from '../../http/api/overtimes.js'
import { Grid } from 'gridjs-react'
import { deleteVacation, getUserVacations } from '../../http/api/vacation.js'
import { vacationTypes } from '../../config/vacationTypes.js'
import { h } from 'gridjs'
import statusChecker from '../../features/statusChecker.js'
import { setCurrentUserData } from '../../store/slices/adminSlice.js'
import { useNavigate } from 'react-router-dom'
import { deleteIllness } from '../../http/api/illness.js'
import { toast } from 'react-toastify'

const VacationList = () => {
    const [data, setData] = useState([])
    const [staticData, setStaticData] = useState([])
    const user = useSelector(userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getUserVacations(user.employeeId).then((res) => {
            const tempData = []
            setStaticData(res.data)
            res.data.map((vacation) => {
                const type = vacationTypes.find(
                    (vType) => vType.value === vacation.vacationType
                ).name

                tempData.push([
                    vacation.id,
                    vacation.startDate.slice(0, 10),
                    vacation.endDate.slice(0, 10),
                    type,
                    statusChecker(vacation),
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
                'Type',
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
                                    deleteVacation(row.cells[0].data).then(
                                        () => {
                                            toast.success(
                                                'Vacation successfully deleted!'
                                            )
                                            setData(
                                                data.filter((vct) => {
                                                    return (
                                                        vct[0] !==
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
                                            (vct) => vct.id == row.cells[0].data
                                        ).status > 1
                                    ) {
                                        navigate(
                                            `/vacation/view/${row.cells[0].data}`
                                        )
                                    } else {
                                        navigate(
                                            `/vacation/edit/${row.cells[0].data}`
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

export default VacationList
