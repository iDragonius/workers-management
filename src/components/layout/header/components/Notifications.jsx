import React, { useEffect, useState } from 'react'
import Dropdown from '../../../ui/dropdown/Dropdown'
import cn from 'classnames'
import { getAllNotifications, getUserNotifications } from '../../../../http/api/notification'
import { Link } from 'react-router-dom'
import { notificationTypes } from '../../../../config/NotificationTypes.js'
import { useDispatch } from 'react-redux'
import { setData } from '../../../../store/slices/notificationSlice.js'

const Notifications = ({ icon }) => {
    const [isActive, setIsActive] = useState(false)
    const [notifications, setNotifications] = useState([])
    const dropdownHide = () => {
        setIsActive(false)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        getAllNotifications().then((res) => {
            setNotifications(res.data)
            dispatch(setData(res.data))
        })
    }, [])

    useEffect(() => {
        window.addEventListener('click', dropdownHide)
        console.log(12)
        // return window.removeEventListener('click', dropdownHide)
    }, [])
    return (
        <div className={cn('relative')}>
            <div
                onClick={async (e) => {
                    e.stopPropagation()
                    setIsActive(!isActive)
                }}
                className={
                    'p-2 bg-white shadow-md cursor-pointer mx-3 hover:scale-105 transition-all ease-in-out'
                }
            >
                {icon}
            </div>
            {isActive && (
                <Dropdown>
                    <div
                        className={'flex flex-col items-center  '}
                        style={{
                            height: '200px',
                            overflowY: 'scroll',
                        }}
                    >
                        {notifications.length > 0 ? (
                            <>
                                {notifications.map(
                                    (notification) => {
                                        return (
                                            <>
                                                {
                                                    notification.status ===1 && (
                                                        <div
                                                            className={
                                                                ' py-2 px-2 border mb-3 border-b-4 border-b-primary shadow-md rounded-md w-full'
                                                            }
                                                        >
                                                            <p>{notification.title}</p>
                                                            <Link
                                                                to={`/${
                                                                    notificationTypes.find(
                                                                        (ntf) =>
                                                                            ntf.value ===
                                                                            notification.notificationType
                                                                    ).name
                                                                }/check/${
                                                                    notification.recordId
                                                                }`}
                                                                onClick={() =>
                                                                    setIsActive(false)
                                                                }
                                                                className={
                                                                    ' text-primary font-semibold text-sm w-full'
                                                                }
                                                                style={{ textAlign: 'end' }}
                                                            >
                                                                View
                                                            </Link>
                                                        </div>

                                                    )
                                                }

                                            </>
                                        )
                                    }
                                )}
                            </>
                        ) : (
                            <h1>You dont have any notification ...</h1>
                        )}
                    </div>

                    <div className={'flex justify-center py-2'}>
                        <Link
                            to={'/notifications'}
                            onClick={() => setIsActive(false)}
                        >
                            <p className={'text-primary font-semibold text-sm'}>
                                View All
                            </p>
                        </Link>
                    </div>
                </Dropdown>
            )}
        </div>
    )
}

export default Notifications
