import MessagesModel from "../models/Messages.mjs"

export default class MessageController {
    static async getAll(req, res){
        const data = await MessagesModel.getAll()
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
    }

    static async save(req, res, message) {
        message.createDate = +(new Date())
        message.author = req.params.currentUserId

        const data = await MessagesModel.add(message)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({id: data}))
    }

    static async delete(req, res, id) {
        res.setHeader('Content-Type', 'text/html')
        res.end('<html><head></head><body><h2>test</h2></body></html>')
    }

    static async update(req, res, id, data) {

    }
}