import $api from '../index.js'
import { dayTypes } from '../../config/index.js'

const PREFIX = '/CalendarDays'

export const addNonWorkingDay = async (data) => {
    return await $api.post(`${PREFIX}/add`, {
        date: data.date,
        dayType: data.type,
    })
}
