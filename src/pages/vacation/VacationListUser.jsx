import React, { useEffect, useState } from 'react'
import { deleteVacation, getUserVacations } from '../../http/api/vacation.js'
import { useSelector } from 'react-redux'
import { userData } from '../../store/slices/adminSlice.js'
import { vacationTypes } from '../../config/vacationTypes.js'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { useNavigate } from 'react-router-dom'
import statusChecker from '../../features/statusChecker.js'
import Back from '../../components/ui/Back.jsx'

const VacationListUser = () => {
    const user = useSelector(userData)
    const [data, setData] = useState([])
    const [staticData, setStaticData] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        if (!user.employeeId) {
            navigate('/vacation/list')
            return
        }
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
        <>
            <Back />
            <div className={' mt-2 py-2 px-5 bg-primary shadow-md rounded-md'}>
                <p className={'text-white text-lg'}>
                    {user.firstName} {user.lastName} vacations
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
                                            () =>
                                                setData(
                                                    data.filter((vct) => {
                                                        return (
                                                            vct[0] !==
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
                                                (vct) =>
                                                    vct.id == row.cells[0].data
                                            )
                                        )
                                        if (
                                            +staticData.find(
                                                (vct) =>
                                                    vct.id == row.cells[0].data
                                            ).status > 1
                                        ) {
                                            navigate(
                                                `/vacation/edit/${row.cells[0].data}`
                                            )
                                        } else {
                                            navigate(
                                                `/vacation/check/${row.cells[0].data}`
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
        </>
    )
}

export default VacationListUser
