import $api from '../index.js'

const PREFIX = '/Reports'

export const getReportByDate = async (date) =>
    await $api.get(`${PREFIX}/tabel/?date=${date}`)
