import {configureStore} from '@reduxjs/toolkit'
import messanger from './messanger'
import settings from './settings'

const store = configureStore({
    reducer: {
        messanger,
        settings
    }
})

export default store