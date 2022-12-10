import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'

export let ws = new WebSocket('ws://localhost:8888')

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)