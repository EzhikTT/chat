import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Aside from '../components/messanger/Aside.jsx'
import Chat from '../components/messanger/Chat.jsx'
import { addMessage, setMessages } from '../store/messanger.js'

import '../style/messanger.css'

const Messanger = () => {
    const arMessages = [
        {
            userName: 'user name',
            message: 'some message',
            count: 0,
            time: '14:88'
        },
        {
            userName: 'user name 1',
            message: 'some message',
            count: 1,
            time: '14:88'
        },
        {
            userName: 'user name 2',
            message: 'some message',
            count: 1,
            time: '14:88'
        },
        {
            userName: 'user name 3',
            message: 'some message',
            count: 1,
            time: '14:88'
        }
    ]

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setMessages(arMessages))
    }, [])

    const onClick = () => {
        const newMessage = {
            userName: 'user name' + arMessages.length,
            message: 'some message',
            count: 5,
            time: '14:88'
        }
        dispatch(addMessage(newMessage))
    }

    return <main className='messanger'>
        <Aside/>
        <Chat/>
    </main>
}

export default Messanger