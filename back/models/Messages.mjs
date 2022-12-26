import {promises as fs} from 'fs' 
import path from 'path'
import Utils from '../lib/Utils.mjs'

import { ObjectId } from 'mongodb'

import db from './Db.mjs'

export default class MessagesModel {
    static async add(message) {
        try {
            const {insertedId} = await db.messages().insertOne(message)

            // const dataPath = path.resolve(Utils.ROOT_PATH, `./data/messages.json`)
            // const data = JSON.parse((await fs.readFile(dataPath)).toString())
            // data.push(message)
            // await fs.writeFile(dataPath, JSON.stringify(data))

            return insertedId.toString() || -1
        }
        catch(e) {
            return -1
        }
    }

    static async getAll() {
        try {
            // const res = []
            const cursor = db.messages().find()
            const res = await cursor.toArray()
            await cursor.close()
            // (await db.messages().find()).forEach(element => {
                // res.push(element)
            // });
            return res
            // const dataPath = path.resolve(Utils.ROOT_PATH, './data/messages.json')
            // return (await fs.readFile(dataPath)).toString()
        }
        catch(error) {
            return '[]'
        }
    }

    static async delete(id) {
        try {
            const res = await db.messages().deleteOne({_id: ObjectId(id)})
            return res.deletedCount === 1
        }
        catch(e) {
            return false
        }
    }
}