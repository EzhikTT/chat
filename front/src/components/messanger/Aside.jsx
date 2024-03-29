import React, { useMemo, useState} from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import avatar from '../../assets/avatar.png'
import { setChatById, setChats, setUsers, setChatByUser } from '../../store/messanger'
import '../../style/aside.css'
import Header from '../Header.jsx'
import Dialogue from './Dialogue.jsx'
import Polilog from './Polilog.jsx'
import { ws } from '../../index.js'

import styles from './Aside.module.scss'

const Aside = () => {
    const [search, setSearch] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])
    const [mapUsers, setMapUsers] = useState({})
    const [isGetNewChats, setIsGetNewChats] = useState(false)
    const [isGetNewChats, setIsGetNewChats] = useState(false)

    const users = useSelector(({messanger}) => messanger.users)
    const chats = useSelector(({messanger}) => messanger.chats)
    const token = useSelector(({main}) => main.token)
    const I = useSelector(({settings}) => settings.user)

    const dispatch = useDispatch()

    const getMessagesForUser = (userId) => {
        for(let i of chats){
            if(i.userId === userId){
                return [...i.messages].reverse()
            }
        }
        return []
    }  
    
    useEffect(() => {
        ws.addEventListener('message', ev => {
            console.log('message', ev)
            if(ev.data === 'NEW_CHAT'){
                // if(data._id){
                    // getMessages()
                    setIsGetNewChats(true)
                // }
            }
        })
    }, [])

    useEffect(() => {
        if(isGetNewChats){
            getChats()
            setIsGetNewChats(false)
        }
    }, [isGetNewChats])

    const getChats = async () => {
        const raw = await fetch('http://localhost:8888/chats', {
            headers: {
                'authorization': token
            },
        })
        dispatch(setChats(await raw.json()))
    }

    
    useEffect(() => {
        ws.addEventListener('message', ev => {
            console.log('message', ev)
            if(ev.data === 'NEW_CHAT'){
                // if(data._id){
                    // getMessages()
                    setIsGetNewChats(true)
                // }
            }
        })
    }, [])

    useEffect(() => {
        if(isGetNewChats){
            getChats()
            setIsGetNewChats(false)
        }
    }, [isGetNewChats])

    const getChats = async () => {
        const raw = await fetch('http://localhost:8888/chats', {
            headers: {
                'authorization': token
            },
        })
        dispatch(setChats(await raw.json()))
    }

    useEffect(() => {
        const obj = {}
        for(let u of users){
            obj[u._id] = {...u}
        }
        setMapUsers({...obj})
    }, [users])

    const dialogs = useMemo(() => {
        return chats.map((chat, id) => {
            const key = chat.recepient === I._id ? 'author' : 'recepient'
            const user = mapUsers[chat[key]]
            return <Dialogue userName={user.name} 
                message={''}
                count={''}
                time={''}
                avatar={user.avatar}
                key={`dialogue_${id}`}
                userId={user._id}/>
            }
        )
    }, [mapUsers, chats])

    const polilogs = useMemo(() => {
        const polichats = chats.filter(({usersIds}) => usersIds)
        return polichats.map((chat, id) => {
            const lastMessage = chat.messages[chat.messages.length - 1] 
            return <Polilog title={chat.name} 
                message={lastMessage.message} 
                time={lastMessage.time} 
                chatId={chat.chatId} 
                logo={chat.logo} 
                key={`polilogue_${id}`}/>
            }
        )
    }, [chats])

    const onChangeSearch = async ({target: {value}}) => {
        setSearch(value)
        if(value.length > 2){
            const raw = await fetch(`http://localhost:8888/users?search=${value}`, {
                headers: {
                    'authorization': token
                }
            })
            const usersData = await raw.json()

            setSearchedUsers([...usersData])
            // console.log(usersData)
        }
    }

    const createChat = async (userId) => {
        const raw = await fetch('http://localhost:8888/chats', {
            method: 'post',
            headers: {
                'authorization': token
            },
            body: JSON.stringify({
                userId
            })
        })
        const res = await raw.json()

        if(~res.id){ // -1 * (n + 1)
            setSearch('')
            setSearchedUsers([])

            const raw = await fetch('http://localhost:8888/chats', {
                headers: {
                    'authorization': token
                },
            })

            const [rawChats, rawUsers] = await Promise.all([
                fetch('http://localhost:8888/chats', {
                    headers: {
                        'authorization': token
                    },
                }),
                fetch('http://localhost:8888/users', {
                    headers: {
                        'authorization': token
                    },
                })
            ])

            // const res = await raw.json()
            dispatch(setUsers(await rawUsers.json()))
            dispatch(setChats(await rawChats.json()))
            dispatch(setChatByUser(userId))
        }

        console.log(res)
    }

    return <aside className={styles.aside}>
        <Header>
            <Link to="/settings">
                <svg className='settings' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/></svg>
            </Link>
        </Header>
        <section>
            <br/>
            <input value={search} onChange={event => onChangeSearch(event)}/>
            <br/>
            {
                searchedUsers.map((user, i) => 
                    <div onClick={() => createChat(user._id)} key={`search_user_${i}`}>
                        {user.login} - {user.name}
                    </div>)
            }

            {[...dialogs, ...polilogs]}
        </section>
    </aside>
}

export default Aside