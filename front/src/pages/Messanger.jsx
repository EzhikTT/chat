import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Aside from '../components/messanger/Aside.jsx'
import Chat from '../components/messanger/Chat.jsx'
import SliderPanel from '../elements/molecules/SliderPanel.jsx'
import { ws } from '../index.js'
import { addMessage, setChats, setMessages, setSelectedUsersIds, setUsers } from '../store/messanger.js'

// import data from '../mocks/chat.json'

// import '../style/messanger.css'

const Messanger = () => {
    const token = useSelector(({main}) => main.token)

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

        if(token) {
            ws.send(JSON.stringify({token}))
        }

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
            // const res = await fetch('http://localhost:8888/chats', {
                // headers: {
                            // 'Authorization': token
                        // },
            // }) // fetch().then()
            // const {users: usersData, chats} = await res.json() // fetch().then().then()
            
            // const users = await Promise.all(
            //     usersData.map(async (user) => {
            //         const res = await fetch(`http://localhost:8888/users`, {
            //             method: 'post',
            //             headers: {
            //                 'Authorization': token
            //             },
            //             body: JSON.stringify({
            //                 id: user.id,
            //                 token
            //             })
            //         }) // fetch().then()
            //         return await res.json()
            //     })
            // )

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


    const [hiddePanel, setHiddePanel] = useState(true)
    const selectedUserIds = useSelector(({messanger}) => messanger.selectedUserIds)
    const activeChat = useSelector(({messanger}) => messanger.chat)
    const me = useSelector(({settings}) => settings.user)
    // const [user, setUser] = useState(null)
    const [users, setUsersState] = useState([])

    useEffect(() => {
        if(selectedUserIds && selectedUserIds.length > 0){ // ~num === -1 * (num + 1)
            setHiddePanel(false)
            if(users.length === 0){
                getUsersData()
            }
        }
        else {
            setHiddePanel(true)
            setUsersState([])
        }
    }, [selectedUserIds])
    
    const getUserData = async () => {
        try {
            const res = await fetch(`http://localhost:8888/users/${selectedUserId}`) // fetch().then()
            setUser(await res.json()) // fetch().then().then()
        }
        catch(p) { // error
            console.log('fetch error - ', p)
        }
    }

    const getUsersData = async () => {
        const users = await Promise.all(
            selectedUserIds.map(async (id) => {
                const res = await fetch(`http://localhost:8888/users/${id}`) // fetch().then()
                return await res.json()
            })
        )
        setUsersState(users)
    }

    const renderElement = (key, value) => {
        switch(key){
            case 'avatar':
                return <img src={value || avatar}/>
            default: 
                return <span>{value}</span>
        }
    }

    const sliderBody = useMemo(() => {
        if(users.length === 1){
            const user = users[0]
            return <div>
                {Object.keys(user).map(key => <div key={`selected_user_${key}`}>
                    {key}: {renderElement(key, user[key])}
                </div>)}
            </div>
        }
        else if(users.length > 1) { // ~n === -(n + 1)
            return <div>
                <div>{activeChat.name}</div>
                {[me, ...users].map(user => <div>
                    <img src={user.avatar}/>
                    <span>{user.name}</span>
                </div>)}
            </div>
        }
    }, [users, activeChat])

    return <>
        <Aside/>
        <Chat/>
        <SliderPanel isHidden={hiddePanel} 
                     onClosed={() => dispatch(setSelectedUsersIds([]))}
                     hidePanel={() => setHiddePanel(true)}>
            {sliderBody}
        </SliderPanel>
    </>
}

export default Messanger