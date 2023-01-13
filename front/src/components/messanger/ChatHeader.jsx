import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/avatar.png'
import { setChatByUser, setSelectedUsersIds } from '../../store/messanger'
import '../../style/chatHeader.css'

const ChatHeader = () => {
    const chat = useSelector(({messanger}) => messanger.chat)
    const users = useSelector(({messanger}) => messanger.users)
    const I = useSelector(({settings}) => settings.user)

    const dispatch = useDispatch()

    const getUser = () => {
        // debugger
        const key = chat.recepient === I._id ? 'author' : 'recepient'
        for(let i of users){
            if(i._id === chat[key]){
                return i
            }
        }
    }

    const getData = useCallback(() => {
        if(chat.recepient && ~chat.recepient){
            const res = getUser()
            return {
                title: res.name || 'no name',
                avatar: res.avatar || avatar
            }
        }
        else if(chat.usersIds && ~chat.chatId){
            return {
                title: chat.name || 'not title',
                avatar: chat.logo || avatar
            }
        }
        else {
           return {
                title: 'no name',
                avatar
           } 
        }
    }, [chat, users])

    const headerClick = () => {
        if(chat.userId && ~chat.userId){
            dispatch(setSelectedUsersIds([chat.userId]))
        }
        else if(chat.usersIds && ~chat.chatId){
            dispatch(setSelectedUsersIds(chat.usersIds))
        }
    }

    return <header>
        <span onClick={() => dispatch(setChatByUser(-1))}>{"<"}</span>
        <span className='name' 
              onClick={() => headerClick()}>
            {getData().title}
            </span>
        <img src={getData().avatar}/>
    </header>
}

export default ChatHeader