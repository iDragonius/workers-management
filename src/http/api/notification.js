import $api from '../index'

const PREFIX = '/Notifications'
export const getNotifications = async () => {
    return await $api.get(PREFIX + '/getall')
}
export const getUserNotifications = async (id) => {
    return await $api.get(PREFIX + `/getbyuser/?userId=${id}`)
}
export const getAllNotifications = async () => {
    return await $api.get(`${PREFIX}/getall`)
}
export const setNotificationStatus = async ({ notificationId, status }) => {
    return await $api.post(
        PREFIX + `/setstatus/?notificationId=${notificationId}&status=${status}`
    )
}
export const setEmployeeStatus = async ({ data, notificationId }) => {
    return await $api.post(
        PREFIX + `/saveemployee/?notificationId=${notificationId}`,
        data
    )
}
