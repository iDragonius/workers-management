import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [],
    },
    reducers: {
        setData: (state, action) => {
            state.data = [...action.payload]
        },

        deleteData: (state) => {
            state.data = []
        },
    },
})

export default notificationSlice.reducer

export const { setData, deleteData } = notificationSlice.actions

export const notificationsData = (state) => state.notification.data
