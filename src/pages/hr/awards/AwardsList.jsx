import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllStates } from '../../../http/api/states.js'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { deleteAward, getAllAwards } from '../../../http/api/awards.js'
import { deletePermission } from '../../../http/api/permissions.js'
import { toast } from 'react-toastify'

const AwardsList = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        getAllAwards().then((awards) => {
            const temp = []
            awards.data.map((award) => {
                temp.push([award.id, award.name, award.amount])
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
                'Name',
                'Amount',
                {
                    name: 'Delete',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white font-semibold bg-red-500 ',
                                onClick: () => {
                                    deleteAward(row.cells[0].data).then(() => {
                                        toast.success(
                                            'Award successfully deleted!'
                                        )
                                        setData(
                                            data.filter((awr) => {
                                                return (
                                                    awr[0] !==
                                                    +row.cells[0].data
                                                )
                                            })
                                        )
                                    })
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
                                    navigate(
                                        `/hr/awards/change/${row.cells[0].data}`
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

export default AwardsList
