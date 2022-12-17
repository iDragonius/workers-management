import $api from '../index.js'

const PREFIX = '/Vacations'

export const getAllVacations = async () => {
    return await $api.get(`${PREFIX}/getall`)
}

export const getVacation = async (id) => {
    return await $api.get(`${PREFIX}/get/?id=${id}`)
}

export const getUserVacations = async (id) => {
    return await $api.get(`${PREFIX}/getbyemployee/?employeeId=${id}`)
}
export const addVacation = async (data) => {
    return await $api.post(`${PREFIX}/add`, data)
}

export const updateVacation = async (data) => {
    return await $api.post(`${PREFIX}/update`, data)
}
export const deleteVacation = async (id) => {
    return await $api.post(PREFIX + '/delete', { id })
}
