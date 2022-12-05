import {promises as fs} from 'fs' 
import path from 'path'
import Utils from '../lib/Utils.mjs'

export default class ChatModel {
    static async add(chat) {
        try {
            const dataPath = path.resolve(Utils.ROOT_PATH, `./data/chat.json`)
            const data = JSON.parse((await fs.readFile(dataPath)).toString())
            chat.id = data.length
            data.push(chat)
            await fs.writeFile(dataPath, JSON.stringify(data))
            return chat.id
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
}