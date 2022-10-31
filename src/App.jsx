import React from 'react'
import {RouterProvider} from 'react-router-dom'
import {Provider as ReduxProvider} from 'react-redux'
import store from './store'
import router from './router'

import './style/messanger.css'

const App = () => {
    return <main>
        <ReduxProvider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </ReduxProvider>
    </main>
}

export default App;