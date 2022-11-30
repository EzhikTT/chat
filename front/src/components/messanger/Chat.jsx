import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatForm from './ChatForm.jsx'
import ChatHeader from './ChatHeader.jsx'
import '../../style/chat.css'
import Message from './Message.jsx'
import avatar from '../../assets/avatar.png'
import { setSelectedUsersIds } from '../../store/messanger.js'

const Chat = () => {
    const data = useSelector(({messanger}) => messanger.chat) 
    const users = useSelector(({messanger}) => messanger.users)

    const dispatch = useDispatch()

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
            {[...data.messages].reverse().map((message, id) => 
                {
                    const user = message.userId ? getUser(message.userId) : {}
                    
                    return <Message key={`message_${id}`} 
                                    text={message.message} 
                                    time={message.time} 
                                    isMy={message.isMy} 
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