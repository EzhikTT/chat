import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatForm from './ChatForm.jsx'
import ChatHeader from './ChatHeader.jsx'
import '../../style/chat.css'
import Message from './Message.jsx'
import avatar from '../../assets/avatar.png'
import { setSelectedUsersIds, setMessages as setMessagesToStore } from '../../store/messanger.js'
import { useState } from 'react'
import { useEffect } from 'react'
import { ws } from '../../index.js'


const Chat = () => {
    const data = useSelector(({messanger}) => messanger.chat) 
    const users = useSelector(({messanger}) => messanger.users)
    const mess = useSelector(({messanger}) => messanger.messages)
    const token = useSelector(({main}) => main.token)
    const I = useSelector(({settings}) => settings.user)

    const [messages, setMessages] = useState([])
    const [isGetNewMessages, setIsGetNewMessages] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        ws.addEventListener('message', ev => {
            console.log('message', ev)
            if(ev.data === 'NEW_MESSAGE'){
                // if(data._id){
                    // getMessages()
                    setIsGetNewMessages(true)
                // }
            }
        })

        // if(data._id){
            getMessages()
        // }
    }, [])

    useEffect(() => {
        if(isGetNewMessages){
            getMessages()
            setIsGetNewMessages(false)
        }
    }, [isGetNewMessages])

    const getMessages = async () => {
        // debugger
        if(data._id){
            const raw = await fetch(
                `http://localhost:8888/chats/${data._id}/message`, 
                {
                    headers: {
                        'authorization': token
                    },
                }
            )
            const messes = await raw.json()
            // debugger
            dispatch(setMessagesToStore(messes))
            // setMessages([...data].reverse())
        }
    }

    useEffect(() => {
        // if(data._id){
            getMessages()
        // }
    }, [data])

    useEffect(() => {
        const ar = []
        // debugger
        for(let m of mess){
            if(m.chatId === data._id){
                ar.push({...m})
            }
        }
        setMessages([...ar].reverse())
        // debugger
    }, [mess, data, users])

    if(Object.keys(data).length === 0){
        return <section>
            No data
        </section>
    }

    const getUser = (id) => {
        for(let i of users){
            if(i.id === id){
                return i
            }
        }
    }

    return <section className='chat'>
        <ChatHeader/>
        <div className='messages'>
            {messages.map((message, id) => 
                {
                    const user = message.userId ? getUser(message.userId) : {}
                    
                    return <Message key={`message_${id}`} 
                                    text={message.text} 
                                    time={message.createDate} 
                                    isMy={message.author === I._id} 
                                    img={user.avatar || avatar}
                                    title={user.name || null}
                                    onClick={~user.id ? () => dispatch(setSelectedUsersIds([user.id])) : null}/>
                }
            )}
        </div>
        <ChatForm/>
    </section>
}

export default Chat