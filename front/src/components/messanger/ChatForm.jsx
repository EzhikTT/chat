import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ws } from "../../index.js"
import {sendMessage as actionSendMessage, setMessages} from '../../store/messanger.js'
import '../../style/chatFooter.css'

const ChatForm = () => {
    const chat = useSelector(({messanger}) => messanger.chat)
    const token = useSelector(({main}) => main.token)

    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const sendMessage = async () => {
        if(text){
            const raw = await fetch('http://localhost:8888/chats/message', {
                method: 'post',
                headers: {
                    'authorization': token
                },
                body: JSON.stringify({
                    text,
                    recepient: chat.recepient,
                    chatId: chat.id
                })
            })
            const data = await raw.json()

            if(~data.id){
                const raw = await fetch('http://localhost:8888/chats/message', {
                    headers: {
                        'authorization': token
                    },
                })
                const data = await raw.json()
                dispatch(setMessages(data))
                setText('')
            }

            ws.send(JSON.stringify({action: {user: chat.recepient, message: text}}))

            // dispatch(actionSendMessage(text))
        }
    }

    return <footer>
        <textarea value={text} onChange={(event) => setText(event.target.value)}></textarea>
        <div>
            <button onClick={() => sendMessage()}>send</button>
            <button>attach</button>
        </div>
    </footer>
}

export default ChatForm