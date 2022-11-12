import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 'personal',
    user: {
        name: 'Petr petrov',
        avatar: 'some image',
        login: 'petr_228',
        birthday: '11.10.2000'
    }
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setPage: (state, {payload: page}) => {
            state.page = page
        },
        updateUser: (state, {payload: userData}) => {
            // const {name, avatar, login, birthday} = userData
            // if(name){
            //     state.user.name = name
            // }

            for(let i in userData){
                if(i && state.user.hasOwnProperty(i)){
                    state.user[i] = userData[i]
                }
            }
        }
    }
})

export const {setPage, updateUser} = settingsSlice.actions
export default settingsSlice.reducer