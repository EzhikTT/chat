import http from 'http'
import {WebSocketServer} from 'ws'
import UsersController from './controlles/Users.mjs'
import BaseController from './controlles/Base.mjs'
import MessageController from './controlles/Message.mjs'
import ChatController from './controlles/Chat.mjs'
import TokensModel from './models/Tokens.mjs'

// console.log(path.dirname(import.meta.url))

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Headers', "*")
    res.setHeader('Access-Control-Allow-Methods', "*")
    res.setHeader('Access-Control-Request-Headers', "*")
    res.setHeader('Access-Control-Request-Method', "*")

    if(req.method === 'OPTIONS'){
        res.statusCode = 200
        res.end('')
    }
    else {
        try {
            if(await BaseController.checkAuthorize(req, res)){
                if(BaseController.get('/users', req, res)){
                    if(req.params.search){
                        console.log('search', req.params.search)
                        await UsersController.search(req, res, req.params.search)
                    }
                    else {
                        await UsersController.getAll(req, res)  
                    }
                }
                else if(BaseController.get('/users/self', req, res)){
                    await UsersController.getSelfInfo(req, res)
                }
                else if(BaseController.get('/users/:id', req, res)){
                    await UsersController.getById(req, res, req.params.id)
                }
                else if(BaseController.get('/chats', req, res)){
                    await ChatController.getAll(req, res)
                }
                else if(await BaseController.post('/chats', req, res)){
                    await ChatController.save(req, res, req.body.userId)
                }
                else if(BaseController.get('/chats/message', req, res)){
                    await MessageController.getAll(req, res)
                }
                else if(await BaseController.post('/chats/message', req, res)){
                    await MessageController.save(req, res, req.body)
                }
                else if(BaseController.delete('/chats/message/:id', req, res)){
                    await MessageController.delete(req, res, req.params.id)
                }
                else if(await BaseController.put('/chats/message/:id', req, res)){
                    await MessageController.update(req, res, req.params.id, req.body)
                }
                else {
                    console.log('auth')
                    res.statusCode = 404
                    res.end('Not found')
                }
            }
            else {
                if(await BaseController.post('/users', req, res)){
                    await UsersController.save(req, res, req.body)
                }
                else if(await BaseController.post('/login', req, res)){
                    await UsersController.login(req, res, req.body)
                }
                else {
                    console.log('no auth')
                    res.statusCode = 404
                    res.end('Not found')
                }
            }          
        }
        catch(error) {
            console.log(error)
            res.statusCode = 502
            res.end('Server error')
        }
    }
})


const WebSockerServer = new WebSocketServer({server})

export const clients = {}

WebSockerServer.on('connection', ws => {
    // console.log(i++, ws)
    ws.on('open', m => {
        console.log('open', m)
    })
    ws.on('message', async m => {
        console.log('message', m.toString())

        const {token, action} = JSON.parse(m.toString())

        if(token){
            const userId = await TokensModel.getUserIdByToken(token)
            if(userId){
                clients[userId] = ws
            }
        }

        if(action){
            const {user, message} = action

            if(user && message && clients[user]){
                clients[user].send(message)
            }
        }

    })
    ws.on('close', m => {
        console.log('close', m)
    })
    ws.on('error', m => {
        console.log('close', m)
    })
})

server.listen(8888)