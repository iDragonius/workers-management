import $api from '../index.js'

const PREFIX = '/Permissions'

export const addPermission = async (data) => {
    return await $api.post(PREFIX + '/add', data)
}
