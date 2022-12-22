import {
    getAllNotifications,
    setNotificationStatus,
} from '../http/api/notification.js'
import { updatePermission } from '../http/api/permissions.js'
import { toast } from 'react-toastify'
import { setData as setNtfc } from '../store/slices/notificationSlice.js'

export default ({
    status,
    currUser,
    data,
    updateFnc,
    route,
    dispatch,
    navigate,
    notifications,
    notificationType,
}) => {
    let notificationId
    try {
        notificationId = notifications.find(
            (ntf) =>
                ntf.recordId === +location.pathname.split('/').at(-1) &&
                ntf.notificationType === notificationType
        ).id
        setNotificationStatus({
            notificationId,
            status,
        }).then(() => {
            updateFnc({
                ...data,
                id: +location.pathname.split('/').at(-1),
                employeeId: currUser.id,
            }).then(() => {
                toast.success(
                    `${
                        currUser.name + ' ' + currUser.surname
                    } permission successfully accepted!`
                )
                navigate(-1)
            })
        })
    } catch (err) {
        getAllNotifications()
            .then((res) => {
                dispatch(setNtfc(res.data))
                notificationId = res.data.find(
                    (ntf) =>
                        ntf.recordId === +location.pathname.split('/').at(-1) &&
                        ntf.notificationType === notificationType
                ).id
            })
            .then(() => {
                setNotificationStatus({
                    notificationId,
                    status,
                }).then(() => {
                    updateFnc({
                        ...data,
                        id: +location.pathname.split('/').at(-1),
                        employeeId: currUser.id,
                    }).then(() => {
                        toast.success(
                            `${
                                currUser.name +
                                ' ' +
                                currUser.surname +
                                ' ' +
                                route
                            }  successfully accepted!`
                        )
                        navigate(-1)
                    })
                })
            })
    }
}
