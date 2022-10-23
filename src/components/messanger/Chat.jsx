import React from 'react'
import { useSelector } from 'react-redux'
import ChatForm from './ChatForm.jsx'
import ChatHeader from './ChatHeader.jsx'
import '../../style/chat.css'
import Message from './Message.jsx'

const Chat = () => {
    const data = useSelector(({messanger}) => messanger.chat) 

    if(Object.keys(data).length === 0){
        return <section>
            No data
        </section>
    }

    return <section className='chat'>
        <ChatHeader/>
        <div className='messages'>
            {[...data.messages].reverse().map((message, id) => <Message key={`message_${id}`} text={message.message} time={message.time} isMy={message.isMy}/>)}
        </div>
        <ChatForm/>
    </section>
}

export default Chat