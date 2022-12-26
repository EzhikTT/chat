import { MongoClient } from "mongodb";

class DbConnection {
    url = 'mongodb://localhost:27017'

    constructor() {
        this.client = new MongoClient(this.url)
        this.database = this.client.db('messanger')
    }

    users() {
        return this.database.collection('users')
    }

    messages() {
        return this.database.collection('messages')
    }

    chats() {
        return this.database.collection('chats')
    }

    tokens() {
        return this.database.collection('tokens')
    }
}

const db = new DbConnection()

export default db