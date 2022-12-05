import {promises as fs} from 'fs' 
import path from 'path'
import Utils from '../lib/Utils.mjs'

export default class UsersModel {
    static async getAll(){
        try{
            const dataPath = path.resolve(Utils.ROOT_PATH, './data/users.json')
            return (await fs.readFile(dataPath)).toString()
        }
        catch(error){
            return '[]'
        }
    }

    static async login(login, password) {
        try {
            const users = JSON.parse(await UsersModel.getAll())
            for(let u of users){
                if(u.login === login && u.password === password){
                    return u
                }
            }
        }
        catch(error){
        }
        return {}
    }

    static async getList(search){
        const users = JSON.parse(await UsersModel.getAll())
        const res = []
        console.log(users)
        for(let u of users){
            if(u.login.includes(search) || u.name.includes(search) || u.email.includes(search)){
                res.push(u)
            }
        }
        return res
    }

    static async getById(id){
        try{
            const data = JSON.parse(await UsersModel.getAll())
            for(let user of data){
                if(user.id === id){
                    return JSON.stringify(user)
                }
            }
            // return '{}'
            // const dataPath = path.resolve(Utils.ROOT_PATH, `./data/users/${id}.json`)
            // return (await fs.readFile(dataPath)).toString()
        }
        catch(e){
            // return '{}'
        }
        return '{}'
    }

    static async add(user){
        try {
            const data = JSON.parse(await UsersModel.getAll())
            const newId = data.length + 1
            data.push({...user, id: newId})
            const dataPath = path.resolve(Utils.ROOT_PATH, './data/users.json')
            await fs.writeFile(dataPath, JSON.stringify(data))
            return newId
        }
        catch(e) {
            return -1
        }
    }
}