import React, { useEffect, useState } from 'react'
import { getAllNotifications, getUserNotifications } from '../../http/api/notification.js'
import { Link } from 'react-router-dom'
import { notificationTypes } from '../../config/index.js'

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        getAllNotifications().then((res) => {
            setNotifications(res.data)
        })
    }, [])
    return (
        <div>
            {notifications.length > 0 ? (
                <>
                    {notifications.map((data) => {
                        return (
                            <>
                            { data.status === 1 && (
                                    <div key={data.id} className={'py-3 px-4 bg-white  my-2 shadow-md border-b-4 border-b-primary border border flex justify-between'}>
                                        <p>
                                            {data.title}
                                        </p>
                                        <Link to={`/${notificationTypes.find(ntfct=>ntfct.value === data.notificationType).name}/check/${data.recordId}`} className={'text-primary font-semibold'}>View</Link>
                                    </div>
                                )}
                            </>
                        )
                    })}
                </>
            ) : (
                <h1>You dont have any notifications</h1>
            )}
        </div>
    )
}

export default Notifications
