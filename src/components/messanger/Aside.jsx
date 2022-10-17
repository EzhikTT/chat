import React from 'react'
import { useSelector } from 'react-redux'

import avatar from '../../assets/avatar.png'
import '../../style/aside.css'
import Dialogue from './Dialogue.jsx'

const Aside = () => {
    const arMessages = useSelector(store => store.messanger.messages)

    return <aside>
        <header>
            <img src={avatar}/>
            <div>User name</div>
        </header>
        <section>
            {arMessages.map(
                (message) => <Dialogue userName={message.userName} 
                                       message={message.message}
                                       count={message.count}
                                       time={message.time}/>)
            }
        </section>
    </aside>
}

export default Aside