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
const KeysBarUsed = ({ data }) => {
    const [keysCount, setKeysCount] = useState([0, 0, 0])
    const labels = ['Keys']
    let statusData
    useEffect(() => {
        const temp = [0, 0, 0]
        data.map((user) => {
            if (user.isUsed) {
                temp[0]++
            } else {
                temp[1]++
            }
        })
        setKeysCount(temp)
    }, [data])
    statusData = {
        labels,
        datasets: [
            {
                label: 'Used',
                data: labels.map(() => {
                    return keysCount[0]
                }),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Unused',
                data: labels.map(() => keysCount[1]),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }
    return <Bar options={options} data={statusData} />
}

export default KeysBarUsed
