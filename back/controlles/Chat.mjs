import { ObjectId } from "mongodb"
import ChatModel from "../models/Chat.mjs"
import { clients } from "../index.mjs"

export default class ChatController {
    static async getAll(req, res){
        const data = await ChatModel.getList(req.params.currentUserId)
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
    }

    static async save(req, res, userId) {

        const chatId = await ChatModel.findDialogIdByUsers(req.params.currentUserId, userId)

        // console.log(chatId)

        if(~chatId){
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({id: chatId}))
        }
        else {
            const chat = {
                author: req.params.currentUserId,
                recepient: ObjectId(userId),
                createDate: +(new Date()),
                messages: []
            }
    
            const data = await ChatModel.add(chat)

            if(data && clients[chat.recepient] && Array.isArray(clients[chat.recepient])){
                for(let conn of clients[chat.recepient]){
                    conn.send('NEW_CHAT')
                }
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({id: data}))
        }
    }
}