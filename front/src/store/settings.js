import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 'personal',
    user: {}
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setPage: (state, {payload: page}) => {
            state.page = page
        },
        updateUser: (state, {payload: userData}) => {
            for(let i in userData) {
                if(i && state.user.hasOwnProperty(i)) {
                    state.user[i] = userData[i]
                }
            }
        },
        setUser: (state, {payload: user}) => {
            state.user = user
        }
    }
})

export const {setPage, updateUser, setUser} = settingsSlice.actions
export default settingsSlice.reducer