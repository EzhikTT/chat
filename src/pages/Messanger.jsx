import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Aside from '../components/messanger/Aside.jsx'
import Chat from '../components/messanger/Chat.jsx'
import { addMessage, setChats, setMessages, setUsers } from '../store/messanger.js'

// import data from '../mocks/chat.json'

// import '../style/messanger.css'

const Messanger = () => {
    const arMessages = [
        {
            userName: 'user name',
            message: 'some message',
            count: 0,
            time: '14:88'
        },
        {
            userName: 'user name 1',
            message: 'some message',
            count: 1,
            time: '14:88'
        },
        {
            userName: 'user name 2',
            message: 'some message',
            count: 1,
            time: '14:88'
        },
        {
            userName: 'user name 3',
            message: 'some message',
            count: 1,
            time: '14:88'
        }
    ]

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(setMessages(arMessages))
        // dispatch()

        // fetchData()

        getData()
    }, [])


    const fetchD = async () => {
        try{
            fetchData()
        }
        catch(e){
            console.log('useEffect', 'error', e)
        }
    }

    const fetchData = () => {
        
        // console.log(data);

        // dispatch(setUsers(data.users))
        // dispatch(setChats(data.chats))

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('setTimeout')
                // return resolve()
                return resolve(new Promise((res, rej) => {
                    setTimeout(() => {
                        console.log('setTimeout 1')
                        return rej('some error')
                    }, 2000)
                }))
            }, 2000)
        })

        // promise.then(() => {
        //     console.log('success')
        // })

        // console.log('fetch data')

        promise.then((success) => {
            return success
        }).then((success1) => {
            console.log('s2', success1)
        }).catch((error) => {
            // throw error
        })

        console.log('fetch data');

        fetch(
            'http://localhost:8888/test'
        ).then(result => {
            // debugger
            return result.json()
        }).then(result => {
            console.log(result)
            dispatch(setUsers(result.users))
            dispatch(setChats(result.chats))
        })
    }

    const getData = async () => {
        try{
            const res = await fetch('http://localhost:8888/test') // fetch().then()
            const {users, chats} = await res.json() // fetch().then().then()
            
            dispatch(setUsers(users))
            dispatch(setChats(chats))
        }
        catch(p){ // error
            console.log(p)
        }
    }

    const onClick = () => {
        const newMessage = {
            userName: 'user name' + arMessages.length,
            message: 'some message',
            count: 5,
            time: '14:88'
        }
        dispatch(addMessage(newMessage))
    }

    return <>
        <Aside/>
        <Chat/>
    </>
}

export default Messanger