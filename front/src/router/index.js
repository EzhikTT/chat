import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Main from '../pages/Main.jsx'
import Messanger from '../pages/Messanger.jsx'
import Settings from '../pages/Settings.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>
    },
{
    path: '/messanger',
        element: <Messanger/>
},
    {
        path: '/settings',
        element: <Settings/>
    }
])

export default router