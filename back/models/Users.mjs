import {promises as fs} from 'fs' 
import path from 'path'
import {genSalt, hash} from 'bcrypt'

import Utils from '../lib/Utils.mjs'
import db from './Db.mjs'

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
            const user = await db.users().findOne({login})
            if(user){
                const hashPassword = await hash(password, user.salt)
                if(hashPassword === user.password){
                    return {
                        login: user.login,
                        name: user.name,
                        id: user._id,
                        email: user.email
                    }
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
            /*
            
                login "admin1"
                password "admin1"
                email "sda@sad.d"
                name "admin 12"
          
            */
            const salt = await genSalt(16)
            const hashPassword = await hash(user.password, salt)
            
            user.salt = salt
            user.password = hashPassword

            const res = await db.users().insertOne(user)
            return res.insertedId.toString()

            // const data = JSON.parse(await UsersModel.getAll())
            // const newId = data.length + 1
            // data.push({...user, id: newId})
            // const dataPath = path.resolve(Utils.ROOT_PATH, './data/users.json')
            // await fs.writeFile(dataPath, JSON.stringify(data))
            // return newId
        }
        catch(e) {
            return -1
        }
    }
}