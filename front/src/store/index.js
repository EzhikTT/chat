import {configureStore} from '@reduxjs/toolkit'
import messanger from './messanger'
import settings from './settings'
import main from './main'

const store = configureStore({
    reducer: {
        messanger,
        settings,
        main
    }
})

export default store