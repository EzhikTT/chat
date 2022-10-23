import React from 'react'
import { useSelector } from 'react-redux'

import avatar from '../../assets/avatar.png'
import '../../style/aside.css'
import Dialogue from './Dialogue.jsx'

const Aside = () => {
    const users = useSelector(({messanger}) => messanger.users)
    const chats = useSelector(({messanger}) => messanger.chats)

    const getMessagesForUser = (userId) => {
        for(let i of chats){
            if(i.userId === userId){
                return [...i.messages].reverse()
            }
        }
        return []
    }   

    return <aside>
        <header>
            <img src={avatar}/>
            <div>User name</div>
        </header>
        <section>
            {users.map(
                (user, id) => {
                    const lastMessage = getMessagesForUser(user.id)[0]
                    return <Dialogue userName={user.name} 
                                    message={lastMessage.message || ''}
                                    count={''}
                                    time={lastMessage.time || ''}
                                    avatar={user.avatar}
                                    key={`dialogue_${id}`}
                                    userId={user.id}/>
                    })
                }
        </section>
    </aside>
}

export default Aside