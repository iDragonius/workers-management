import $api from '../index.js'

const PREFIX = '/DiseaseBulletens'

export const addIllness = async (data) => {
    return await $api.post(PREFIX + '/add', data)
}

export const getUserIllness = async ({ employeeId }) => {
    return await $api.get(`${PREFIX}/getbyemployee/?employeeId=${employeeId}`)
}

export const getIllness = async (id) => {
    return await $api.get(`${PREFIX}/get/?id=${id}`)
}
