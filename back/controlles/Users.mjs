import {promises as fs} from 'fs' 
import path from 'path'
import Utils from '../lib/Utils.mjs'
import UsersModel from '../models/Users.mjs'
import TokensModel from '../models/Tokens.mjs'

export default class UsersController {

    static async getAll(req, res){
        const data = await UsersModel.getAll()
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
    }

    static async login(req, res, user){
        const data = await UsersModel.login(user.login, user.password)
        const token = await TokensModel.add(user.login, data.id)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({token}))
    }

    static async getById(req, res, id){
        const data = await UsersModel.getById(id)
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
    }

    static async save(req, res, user){
        const userId = await UsersModel.add(user)
        const token = await TokensModel.add(user.login, userId)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({token}))
    }

    static async response(res, path){
        const data = await fs.readFile(path)
        res.setHeader('Content-Type', 'application/json')
        res.end(data.toString())
    }

    static async search(req, res, search){
        const data = await UsersModel.getList(search)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
    }

    static async getSelfInfo(req, res){
        console.log('getSelfInfo', req.params.currentUserId)
        await UsersController.getById(req, res, req.params.currentUserId)
    }
}