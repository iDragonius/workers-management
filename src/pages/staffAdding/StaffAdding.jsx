import { useState } from 'react'
import { toast } from 'react-toastify'
import * as React from 'react'

import dayjs, { Dayjs } from 'dayjs'

const StaffAdding = () => {
    let today = new Date(),
        date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate()
    const [status, setStatus] = useState(false)
    const [value, setValue] = React.useState(dayjs(today))
    const [option, setOption] = React.useState('')

    const handleChange1 = (event) => {
        setOption(event.target.value)
    }
    const handleChange = (newValue) => {
        setValue(newValue)
    }

    return <div></div>
}
export default StaffAdding
