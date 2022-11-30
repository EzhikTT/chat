const http = require('http')
const fs = require('fs')

const requestHandler = (req, res) => {

    console.log(req.method)

    

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
        const tokens = {}

        switch(req.url){
            case "/chat": // "/message/send" - POST "/message/edit" - PUT
                switch(req.method){
                    case 'GET':
                        fs.readFile(__dirname + '/data/chat.json', (err, data) => {
                            res.statusCode = 200
                            res.setHeader('Content-Type', 'application/json')
                            res.end(data)
                        })
                    break
                    default:
                        res.statusCode = 404
                        res.end('Not found')
                        break
                }
                break
            case "/login":
                switch(req.method){
                    case 'POST':
                        postMethod(req, (user) => {
                            fs.readFile(__dirname + "/data/users.json", (err, data) => {
                                if(err){
                                    res.statusCode = 502
                                    res.end('Server error')
                                    return
                                }
    
                                // console.log(req)
                                let isLogin = false
                                const users = JSON.parse(data)
                                // console.log(users)
    
                                for(let u of users){
                                    if(u.login === user.login && u.password === user.password){
                                        isLogin = true
                                    }
                                }
                                if(isLogin){
                                    tokens[user.login] = user.login + "_" + user.password
    
                                    fs.writeFile(__dirname + "/data/tokens.json", JSON.stringify(tokens), () => {})
    
                                    res.statusCode = 200
                                    res.setHeader('Content-Type', 'application/json')
                                    res.end(JSON.stringify({token: tokens[user.login]}))
                                }
                                else {
                                    res.statusCode = 401
                                    res.end('No authorize')
                                }
                            })
                        })
                        break
                    default:
                        res.statusCode = 404
                        res.end('Not found')
                        break
                }
                break
            case "/users":
                switch(req.method){
                    case 'POST':
                        postMethod(req, (data) => 
                            {
                                const id = data.id
                                const token = req.headers['authorization']
                                // console.log(req.headers)
                                // console.log(tokens, token)
                                fs.readFile(__dirname + `/data/tokens.json`, (err, rawData) => {
                                    const tokens = JSON.parse(rawData.toString())
                                    // console.log(rawData.toString(), token)
                                    if(token && ~Object.values(tokens).indexOf(token)){
                                        fs.readFile(__dirname + `/data/users/${id}.json`, (err, data) => {
                                            res.statusCode = 200
                                            res.setHeader('Content-Type', 'application/json')
                                            res.end(data)
                                        })
                                    }
                                    else {
                                        res.statusCode = 403
                                        res.end('Permission denied')
                                    }
                                })
                            }
                        )
                    break
                    default:
                        res.statusCode = 404
                        res.end('Not found')
                        break
                }
                break
            default:
                res.statusCode = 404
                res.end('Not found')
                break
        }
    }

    // const body = []
    // req.on('data', (chunk) => {
    //     body.push(chunk)
    // }).on('end', () => {
    //     console.log(body)
    //     const str = Buffer.concat(body).toString()
    //     console.log(str)
    //     const obj = JSON.parse(str)
    //     console.log(obj)
    // })

    



    // fs.readFile(__dirname + '/data/chat.json', (err, data) => {
    //     res.statusCode = 200
    //     res.setHeader('Content-Type', 'application/json')
    //     res.end(JSON.stringify({'test': 'test'}))
    // })

    // res.setHeader('Content-Type', 'text/html');
    // res.writeHead(200)
    // res.end('<h2>Hello world1</h2>')
}

const server = http.createServer(requestHandler)
server.listen(8888)


const postMethod = (req, callback) => {
    const body = []
    req.on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        const str = Buffer.concat(body).toString()
        const obj = JSON.parse(str)
        callback(obj)
    })
}