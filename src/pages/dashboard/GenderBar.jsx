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
const GenderBar = ({ data }) => {
    const [genderCounts, setGenderCounts] = useState([0, 0])
    const labels = ['Gender']
    useEffect(() => {
        const temp = [0, 0]
        data.map((user) => {
            if (user.gender === 1) {
                temp[0]++
            } else if (user.gender === 2) {
                temp[1]++
            }
        })
        setGenderCounts(temp)
    }, [data])
    const genderData = {
        labels,
        datasets: [
            {
                label: 'Man',
                data: labels.map(() => {
                    return genderCounts[0]
                }),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Woman',
                data: labels.map(() => genderCounts[1]),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }
    return <Bar options={options} data={genderData} />
}

export default GenderBar
