import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    // chat: {}
    chat: {
        userId: 1,
        chatId: 1,
        messages: [
            {
                message: 'some message',
                time: '14:88'
            },
            {
                message: 'some message',
                time: '14:88'
            },
            {
                message: 'some message',
                time: '14:88'
            },
            {
                message: 'some message',
                time: '14:88'
            },
            {
                message: 'some message',
                time: '14:88'
            },
        ]
    }
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
        }
    }
})

export const {setMessages, addMessage} = messangerSlice.actions
export default messangerSlice.reducer