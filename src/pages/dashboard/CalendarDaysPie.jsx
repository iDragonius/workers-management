import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const CalendarDaysPie = ({ data }) => {
    const [calendarDaysCount, setCalendarDaysCount] = useState([0, 0, 0, 0])

    useEffect(() => {
        const temp = [0, 0, 0, 0]
        data.map((day) => {
            temp[day.dayType - 1]++
        })
        setCalendarDaysCount(temp)
    }, [data])
    const calendarData = {
        labels: ['Work Day', 'Rest Day', 'Holiday', 'Mourning'],
        datasets: [
            {
                label: 'days',
                data: calendarDaysCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    return <Pie data={calendarData} />
}

export default CalendarDaysPie
