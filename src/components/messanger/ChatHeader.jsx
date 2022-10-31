import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/avatar.png'
import { setChatByUser } from '../../store/messanger'
import '../../style/chatHeader.css'

const ChatHeader = () => {
    const chat = useSelector(({messanger}) => messanger.chat)
    const users = useSelector(({messanger}) => messanger.users)

    const dispatch = useDispatch()

    const getUser = useCallback(() => {
        for(let i of users){
            if(i.id === chat.userId){
                return i
            }
        }
    }, [chat, users])

    return <header>
        <span onClick={() => dispatch(setChatByUser(-1))}>{"<"}</span>
        <span className='name'>{getUser().name || 'no name'}</span>
        <img src={getUser().avatar || avatar}/>
    </header>
}

export default ChatHeader