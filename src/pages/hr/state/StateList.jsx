import React, { useEffect, useState } from 'react'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { setCurrentUserData } from '../../../store/slices/adminSlice.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteState, getAllStates } from '../../../http/api/states.js'
import { getAllDuties } from '../../../http/api/duty.js'
import { deletePermission } from '../../../http/api/permissions.js'
import { toast } from 'react-toastify'

const StateList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        getAllStates().then((states) => {
            const temp = []
            states.data.map((state) => {
                temp.push([state.id, state.name])
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
                {
                    name: 'Delete',
                    formatter: (cell, row) => {
                        return h(
                            'button',
                            {
                                className:
                                    'py-2  px-4 border rounded-md text-white font-semibold bg-red-500 ',
                                onClick: () => {
                                    if (row.cells[0].data == 1) {
                                        toast.warn('Main state cant be deleted')
                                    }
                                    deleteState(row.cells[0].data).then(() => {
                                        toast.success(
                                            'State successfully deleted!'
                                        )
                                        setData(
                                            data.filter((stt) => {
                                                return (
                                                    stt[0] !==
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
                                        `/hr/state/change/${row.cells[0].data}`
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

export default StateList
