import $api from '../index.js'

const PREFIX = '/Permissions'

export const getPermission = async (id) => {
    return await $api.get(`${PREFIX}/get/?id=${id}`)
}

export const getUserPermissions = async (id) => {
    return await $api.get(`${PREFIX}/getbyemployee?employeeId=${id}`)
}
export const addPermission = async (data) => {
    return await $api.post(PREFIX + '/add', data)
}
export const updatePermission = async (data) => {
    return await $api.post(PREFIX + '/update', data)
}
export const deletePermission = async (id) => {
    return await $api.post(PREFIX + '/delete', { id })
}
