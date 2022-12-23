import React, { useState } from 'react'
import Button from '../../components/ui/buttons/button/Button.jsx'
import { getReportByDate } from '../../http/api/reports.js'
import dayjs from 'dayjs'
import Table from './Table.jsx'

const Tabel = () => {
    const [data, setData] = useState([])
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
    const rows = [
        'No',
        'Name',
        'Surname',
        'Father Name',
        'Salary',
        'Duty',
        'State',
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        'Working Days',
        'Working Hours',
        'Vacation',
        'Disease',
        'Additional W/H',
        'Permission hours',
    ]

    const check = async () => {
        await getReportByDate(date).then((res) => {
            const temp = []
            res.data.rows.map((row) => {
                const dayTemp = []
                row.days.map((day) => {
                    dayTemp.push(day)
                })
                temp.push([
                    row.no,
                    row.name,
                    row.surname,
                    row.fatherName,
                    row.salary,
                    row.duty,
                    row.state,
                    ...dayTemp,
                    row.totalWorkDays,
                    row.totalWorkHours,
                    row.vacationDays,
                    row.diseaseDays,
                    row.overtime,
                    row.permissionHours,
                ])
            })
            setData(temp)
        })
    }

    return (
        <>
            <div
                className={
                    'mt-10   bg-white px-20 py-5 rounded-xl shadow-md w-max flex flex-col items-center'
                }
            >
                <h1 className={'text-2xl font-medium mb-4'}>Get Tabel table</h1>
                <div className={'flex flex-col w-[250px]'}>
                    <div className={'flex flex-col mb-5 relative'}>
                        <label
                            className={
                                'text-gray-500 font-medium  text-xs left-2 bg-white p-1 absolute -top-3'
                            }
                        >
                            Date
                        </label>
                        <input
                            value={date}
                            type={'date'}
                            onChange={(e) => setDate(e.target.value)}
                            className={
                                'w-full py-3 px-3 border hover:border-primary  border-b-4 border-b-primary shadow-md rounded-md  outline-none'
                            }
                        />
                    </div>

                    <Button label={'Get Tabel'} primary onClick={check} />
                </div>
            </div>
            {data.length > 0 && (
                <Table data={data} rows={rows} name={'Tabel'} />
            )}
        </>
    )
}

export default Tabel
