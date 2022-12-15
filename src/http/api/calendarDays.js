import $api from '../index.js'

const PREFIX = '/CalendarDays'

export const getAllNonWorkingDays = async () => {
    return await $api.get(`${PREFIX}/getall`)
}

export const getNonWorkingDay = async (id) => {
    return await $api.get(`${PREFIX}/get/?id=${id}`)
}
export const addNonWorkingDay = async (data) => {
    return await $api.post(`${PREFIX}/add`, data)
}

export const updateNonWorkingDay = async (data) => {
    return await $api.post(`${PREFIX}/update`, data)
}