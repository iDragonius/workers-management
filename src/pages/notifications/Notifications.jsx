import React, { useEffect, useState } from 'react'
import { getUserNotifications } from '../../http/api/notification.js'

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        getUserNotifications(+localStorage.getItem('id')).then((res) => {
            setNotifications(res.data)
        })
    }, [])
    return (
        <div>
            {notifications.length > 0 ? (
                <>
                    {notifications.map((data) => {
                        return <div>{data.title}</div>
                    })}
                </>
            ) : (
                <h1>You dont have any notifications</h1>
            )}
        </div>
    )
}

export default Notifications
