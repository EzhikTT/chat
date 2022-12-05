import ChatModel from "../models/Chat.mjs"

export default class ChatController {
    static async getAll(req, res){
        const data = await ChatModel.getList()
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
    }

    static async save(req, res, userId) {
        const chat = {
            author: req.params.currentUserId,
            recepient: userId,
            createDate: +(new Date()),
            messages: []
        }

        const data = await ChatModel.add(chat)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({id: data}))
    }
}