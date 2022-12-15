import $api from '../index.js'

const PREFIX = '/Rewards'

export const getAllAwards = async () => {
    return await $api.get(`${PREFIX}/getall`)
}

export const getAward = async (id) => {
    return await $api.get(`${PREFIX}/get/?id=${id}`)
}
export const addAward = async (data) => {
    return await $api.post(`${PREFIX}/add`, data)
}

export const updateAward = async (data) => {
    return await $api.post(`${PREFIX}/update`, data)
}