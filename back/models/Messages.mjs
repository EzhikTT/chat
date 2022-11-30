import {promises as fs} from 'fs' 
import path from 'path'
import Utils from '../lib/Utils.mjs'

export default class MessagesModel{
    static async add(message){
        try {
            const dataPath = path.resolve(Utils.ROOT_PATH, `./data/messages.json`)
            const data = JSON.parse((await fs.readFile(dataPath)).toString())
            data.push(message)
            await fs.writeFile(dataPath, JSON.stringify(data))
            return data.length - 1
        }
        catch(e){
            return -1
        }
    }
}