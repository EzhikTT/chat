import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatForm from './ChatForm.jsx'
import ChatHeader from './ChatHeader.jsx'
import '../../style/chat.css'
import Message from './Message.jsx'
import avatar from '../../assets/avatar.png'
import { setSelectedUsersIds } from '../../store/messanger.js'
import { useState } from 'react'
import { useEffect } from 'react'

const Chat = () => {
    const data = useSelector(({messanger}) => messanger.chat) 
    const users = useSelector(({messanger}) => messanger.users)
    const mess = useSelector(({messanger}) => messanger.messages)

    const [messages, setMessages] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const ar = []
        for(let m of mess){
            if(m.chatId === data.id){
                ar.push({...m})
            }
        }
        setMessages([...ar].reverse())
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
                                    isMy={false} 
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