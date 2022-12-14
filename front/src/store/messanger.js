import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    chats: [],
    chat: {},
    users: [],
    selectedUserIds: []
}

const messangerSlice = createSlice({
    name: 'messanger',
    initialState, // исходное состояние
    reducers: { // методы, которые изменяют состояние
        setMessages: (state, {type, payload: messages}) => {
            state.messages = messages
        },
        addMessage: (state, {type, payload: message}) => {
            state.messages.push(message)
        },
        setChatByUser: (state, {payload: userId}) => {
            // debugger
            if(userId && state.chats){
                // debugger
                for(let i of state.chats){
                    // debugger
                    if(i.recepient === userId || i.author === userId){
                        state.chat = i
                    }
                }
            }
            else {
                state.chat = {}
            }
        },
        setChatById: (state, {payload: chatId}) => {
            if(chatId > 0){
                for(let i of state.chats){
                    if(i.chatId === chatId){
                        state.chat = i
                    }
                }
            }
            else {
                state.chat = {}
            }
        },
        setChats: (state, {payload: chats}) => {
            state.chats = chats
        },
        setUsers: (state, {payload: users}) => {
            state.users = users
        },
        sendMessage: (state, {payload: text}) => {
            if(Object.values(state.chat).length > 0 && text){
                for(let i = 0; i < state.chats.length; i++){
                    const {chatId} = state.chats[i]
                    if(chatId === state.chat.chatId){
                        const date = new Date()
                        state.chats[i].messages.push({
                            "message": text,
                            "time": `${date.getHours()}:${date.getMinutes()}`,
                            "isMy": true
                        })
                        state.chat.messages.push({
                            "message": text,
                            "time": `${date.getHours()}:${date.getMinutes()}`,
                            "isMy": true
                        })
                    }
                }
            }
        },
        setSelectedUsersIds(state, {payload: ids}){
            state.selectedUserIds = ids
        }
    }
})

export const {setChatById, setSelectedUsersIds, setMessages, addMessage, setChatByUser, setChats, setUsers, sendMessage} = messangerSlice.actions
export default messangerSlice.reducer