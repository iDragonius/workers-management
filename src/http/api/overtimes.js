import $api from '../index'

const PREFIX = '/Overtimes'

export const addOvertime = async ({ employeeId, date, hourCount }) => {
    return await $api.post(`${PREFIX}/add`, { employeeId, date, hourCount })
}

export const getUserOvertimes = async ({ employeeId }) => {
    return await $api.get(`${PREFIX}/getbyemployee?employeeId=${employeeId}`)
}
