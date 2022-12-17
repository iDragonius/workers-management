import $api from '../index'

const PREFIX = '/Overtimes'

export const addOvertime = async ({ employeeId, date, hourCount }) => {
    return await $api.post(`${PREFIX}/add`, { employeeId, date, hourCount })
}

export const getUserOvertimes = async ({ employeeId }) => {
    return await $api.get(`${PREFIX}/getbyemployee?employeeId=${employeeId}`)
}
export const getOvertime = async (id) => {
    return await $api.get(`${PREFIX}/get?id=${id}`)
}
export const updateOvertime = async (data) => {
    return await $api.post(PREFIX + '/update', data)
}
export const deleteOvertime = async (id) => {
    return await $api.post(PREFIX + '/delete', { id })
}
