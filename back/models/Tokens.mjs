import {promises as fs} from 'fs' 
import path from 'path'
import Utils from '../lib/Utils.mjs'
import db from './Db.mjs'

export default class TokensModel {
    static async add(login, userId) {
        try {
            const token = {
                token: login,
                user: userId,
                expires: +(new Date()) + 30 * 24 * 60 * 60 * 1000 // timestamp -> кол-во мс с 01.01.1970
            }

            const res = await db.tokens().insertOne(token)

            // const dataPath = path.resolve(Utils.ROOT_PATH, './data/tokens.json')
            // // await fs.writeFile(dataPath, JSON.stringify(data))
            // const data = JSON.parse(await fs.readFile(dataPath))
            // data.push(token)
            // await fs.writeFile(dataPath, JSON.stringify(data))
            return token.token
        }
        catch(e){
            console.log(e)
            return ''
        }
    }

    static async getUserIdByToken(token) {
        try {
            const dataPath = path.resolve(Utils.ROOT_PATH, './data/tokens.json')
            const data = JSON.parse(await fs.readFile(dataPath))
            const now = +(new Date())
            for(let t of data) {
                console.log(t, now, now < t.expires)
                if(t.token === token && now < t.expires) {
                    return t.user
                }
            }
        }
        catch(e) {
            console.log('error', e)
        }
        return ''
    }
}