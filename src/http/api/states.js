import $api from '../index.js'

const PREFIX = '/States'

export const getAllStates = async () => {
    return await $api.get(`${PREFIX}/getall`)
}
export const getState = async (id) => {
    return await $api.get(`${PREFIX}/get/?id=${id}`)
}

export const addState = async (data) => {
    return await $api.post(`${PREFIX}/add`, data)
}

export const updateState = async (data) => {
    return await $api.post(`${PREFIX}/update`, data)
}
export const deleteState = async (id) => {
    return await $api.post(PREFIX + '/delete', { id })
}
