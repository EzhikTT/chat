import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {sendMessage as actionSendMessage} from '../../store/messanger.js'
import '../../style/chatFooter.css'

const ChatForm = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const sendMessage = () => {
        if(text){
            dispatch(actionSendMessage(text))
            setText('')
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