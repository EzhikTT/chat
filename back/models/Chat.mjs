import {promises as fs} from 'fs' 
import path from 'path'
import Utils from '../lib/Utils.mjs'

import db from './Db.mjs'

export default class ChatModel {
    static async add(chat) {
        try {
            const res = await db.chats().insertOne(chat)
            return res.insertedId.toString()

            // const dataPath = path.resolve(Utils.ROOT_PATH, `./data/chat.json`)
            // const data = JSON.parse((await fs.readFile(dataPath)).toString())
            // chat.id = data.length
            // data.push(chat)
            // await fs.writeFile(dataPath, JSON.stringify(data))
            // return chat.id
        }
        catch(e){
            return -1
        }
    }

    static async getList() {
        try {
            const dataPath = path.resolve(Utils.ROOT_PATH, `./data/chat.json`)
            return (await fs.readFile(dataPath)).toString()
        }
        catch(e) {
            return '[]'
        }
    }

    static async findDialogIdByUsers(...ids){
        try{
            const data = JSON.parse(await ChatModel.getList())
            // author recepient
            console.log(ids, data)
            for(let chat of data){
                console.log(ids, chat)

                if(
                    chat.author === ids[0] && chat.recepient === ids[1] || 
                    chat.author === ids[1] && chat.recepient === ids[0]
                ){
                    return chat.id
                }
            }
        }
        catch(e){
        }
        return -1
    }
}