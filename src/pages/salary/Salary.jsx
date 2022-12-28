import React, { useState } from 'react'
import dayjs from 'dayjs'
import {
    getReportByDate,
    getReportSalaryByDate,
} from '../../http/api/reports.js'
import Button from '../../components/ui/buttons/button/Button.jsx'
import Table from '../tabel/Table.jsx'

const Salary = () => {
    const [data, setData] = useState([])
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
    const rows = [
        'No',
        'Name',
        'Surname',
        'Father Name',
        'Duty',
        'Salary',
        'Total W/H',
        'Work hours',
        'Computed salary',
        'Reward',
        'Vacation',
        'Sum Salary',
        'Incoming Tax',
        'Pension Fond',
        'ISH',
        'ITSH',
        'Total Tax',
        'Value to paid',
    ]
    const check = async () => {
        await getReportSalaryByDate(date).then((res) => {
            const temp = []
            res.data.rows.map((row) => {
                temp.push([
                    row.no,
                    row.name,
                    row.surname,
                    row.fatherName,
                    row.duty,
                    row.salary,
                    row.totalWorkHours,
                    row.workHours,
                    row.computedSalary,
                    row.reward,
                    row.vacation,
                    row.sumSalary,
                    row.incomingTax,
                    row.pensionFond,
                    row.ish,
                    row.itsh,
                    row.totalTax,
                    row.valueToPaid,
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
                <h1 className={'text-2xl font-medium mb-4'}>
                    Get Salary table
                </h1>
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
                <Table data={data} rows={rows} name={'Salary'} />
            )}
        </>
    )
}

export default Salary
