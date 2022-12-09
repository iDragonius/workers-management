import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        token: '',
        employeeId:'',
        email: '',
        id: 0,
        role: '4',
        loading: true,
    },
    reducers: {
        setUserData: (state, action) => {
            state.name = action.payload.name
            state.token = action.payload.token
            state.email = action.payload.email
            state.id = action.payload.id
            if (!action.payload.token) {
                return
            }
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('name', action.payload.name)
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('id', action.payload.id)
        },
        setRole: (state, action) => {
            state.role = action.payload.role
            state.employeeId = action.payload.employeeId
        },
        toggleLoading: (state, action) => {
            state.loading = action.payload
        },
        deleteUserData: (state) => {
            state.name = null
            state.token = null
            state.email = null
            state.employeeId =0
            state.id = 0
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('id')
        },
    },
})

export default authSlice.reducer

export const { setUserData, deleteUserData, setRole, toggleLoading } =
    authSlice.actions

export const userData = (state) => {
    return {
        id:state.auth.id,
        employeeId:state.auth.employeeId,
        name: state.auth.name,
        email: state.auth.email,
        token: state.auth.token,
    }
}

export const userRole = (state) => state.auth.role
export const pageLoading = (state) => state.auth.loading
