import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import adminSlice from './slices/adminSlice'
import notificationSlice from './slices/notificationSlice.js'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice,
        notification: notificationSlice,
    },
    devTools: true,
})
