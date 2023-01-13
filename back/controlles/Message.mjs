import { clients } from "../index.mjs"
import db from "../models/Db.mjs"
import MessagesModel from "../models/Messages.mjs"

export default class MessageController {
    static async getAll(req, res) {
        const data = await MessagesModel.getAll()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
    }

    static async getByChatId(req, res, chatId){
        const data = await MessagesModel.getByChatId(chatId)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
    }

    static async save(req, res, message) {
        message.createDate = +(new Date())
        message.author = req.params.currentUserId.toString()

        const data = await MessagesModel.add(message)

        if(data && clients[message.recepient] && Array.isArray(clients[message.recepient])){
            for(let conn of clients[message.recepient]){
                conn.send('NEW_MESSAGE')
            }
        }

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({id: data}))
    }

    static async delete(req, res, id) {
        const data = await MessagesModel.delete(id)
        res.setHeader('Content-Type', 'text/html')
        res.end(JSON.stringify({result: data}))
    }

    static async update(req, res, id, data) {

    }
}