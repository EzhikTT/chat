import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Messanger from '../pages/Messanger.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Messanger/>
    }
])

export default router