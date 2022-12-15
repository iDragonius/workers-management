import $api from '../index.js'

const PREFIX = '/Employees'

export const getEmployee = async (id) => {
    return await $api.get(`${PREFIX}/get/?id=${id}`)
}

export const getAllEmployees = async () => {
    return await $api.get(`${PREFIX}/getall`)
}

export const updateEmployee = async  (data) =>{
    return await  $api.post(`${PREFIX}/update`, data)
}