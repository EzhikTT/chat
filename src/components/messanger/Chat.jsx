import React from 'react'
import { useSelector } from 'react-redux'

const Chat = () => {
    const data = useSelector(({messanger}) => messanger.chat) 

    if(Object.keys(data).length === 0){
        return <section>
            No data
        </section>
    }

    return <section>
        {data.messages.map((message) => <div>{message.message} - {message.time}</div>)}
    </section>
}

export default Chat