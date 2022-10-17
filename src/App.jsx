import React from 'react'
import {RouterProvider} from 'react-router-dom'
import {Provider as ReduxProvider} from 'react-redux'
import store from './store'
import router from './router'

const App = () => {
    return <ReduxProvider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </ReduxProvider>
}

export default App;