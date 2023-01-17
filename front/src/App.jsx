import React from 'react'
import {RouterProvider} from 'react-router-dom'
import {Provider as ReduxProvider} from 'react-redux'
import store from './store'
import router from './router'

import './style/messanger.scss'
import { useEffect } from 'react'


const App = () => {
    
    // useEffect(() => {
    //     fetch('http://localhost:8888/chats/message', 
    //     {
    //      method:'post',
    //      body: JSON.stringify({
    //         message: 'text',
    //         author: 'author'
    //      })   
    //     })
    // }, [])

    // useEffect(() => {
    //     const ws = new WebSocket('ws://localhost:8888')
    //     ws.addEventListener('open', ev => {
    //         console.log('onopen', ev)
    //         ws.send('some message')

    //     })
    // }, [])



    return <main>
        {/* <div>App</div> */}
        <ReduxProvider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </ReduxProvider>
    </main>
}

export default App;