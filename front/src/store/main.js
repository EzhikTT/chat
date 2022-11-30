import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: null
}

const main = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setToken: (state, {payload: token}) => {
            state.token = token
        }
    }
})

export const {setToken} = main.actions
export default main.reducer