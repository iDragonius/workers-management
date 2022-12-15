import $api from '../index'

const PREFIX = '/Notifications'
export const getNotifications = async () => {
    return await $api.get(PREFIX + '/getall')
}
export const getUserNotifications = async (id) => {
    return await $api.get(PREFIX + `/getbyuser/?userId=${id}`)
}
export const setNotificationStatus = async ({ notificationId, status }) => {
    return await $api.post(
        PREFIX + `/setstatus/?notificationId=${notificationId}&status=${status}`
    )
}
