import fs from 'fs'
import http from 'http'
import UsersController from './controlles/Users.mjs'
import path from 'path'
import BaseController from './controlles/Base.mjs'
import MessageController from './controlles/Message.mjs'
import ChatController from './controlles/Chat.mjs'

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
server.listen(8888)