import $api from '../index.js'


const PREFIX = '/Duties'

export const getAllDuties = async ()=>{
    return await  $api.get(`${PREFIX}/getall`)
}

export const getDuty = async  (id) =>{
    return await  $api.get(`${PREFIX}/get/?id=${id}`)
}

export const addDuty = async  (data) =>{
    return await  $api.post(`${PREFIX}/add`, data)
}

export const updateDuty = async  (data) =>{
    return await  $api.post(`${PREFIX}/update`, data)
}