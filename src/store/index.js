import {configureStore} from '@reduxjs/toolkit'
import messanger from './messanger'

const store = configureStore({
    reducer: {
        messanger
    }
})

export default store