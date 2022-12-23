import React, { useEffect, useState } from 'react'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const options = {
    responsive: true,
    width: '100px',
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
        },
    },
    maintainAspectRatio: false,
}
const StatusBar = ({ data }) => {
    const [statusCount, setStatusCount] = useState([0, 0, 0])
    const labels = ['Status']
    let statusData
    useEffect(() => {
        const temp = [0, 0, 0]
        data.map((user) => {
            if (user.status === 3) {
                temp[2]++
            } else if (user.status === 1) {
                temp[0]++
            } else {
                temp[1]++
            }
        })
        setStatusCount(temp)
    }, [data])
    statusData = {
        labels,
        datasets: [
            {
                label: 'Accepted',
                data: labels.map(() => {
                    return statusCount[1]
                }),
                backgroundColor: 'green',
            },
            {
                label: 'Rejected',
                data: labels.map(() => statusCount[2]),
                backgroundColor: 'red',
            },
            {
                label: 'Pending',
                data: labels.map(() => statusCount[0]),
                backgroundColor: 'orange',
            },
        ],
    }
    return <Bar options={options} data={statusData} />
}

export default StatusBar
