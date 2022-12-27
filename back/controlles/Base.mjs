import Utils from "../lib/Utils.mjs"
import TokensModel from "../models/Tokens.mjs"

export default class BaseController {
    static get(path, req, res){
        if(req.method !== 'GET'){
            return false
        }

        return this.setParams(req, path)
    }

    static delete(path, req, res){
        if(req.method !== 'DELETE'){
            return false
        }

        return this.setParams(req, path)
    }

    static async post(path, req, res){
        if(req.method !== 'POST'){
            return false
        }

        if(this.setParams(req, path)){
            req.body = await Utils.postMethod(req)
            return true
        }
        
        return false
    }

    static setParams(req, path){

        // console.log('set params', req) // /some/very/long/path?p1=v1&p2=v2&p3=v3
        
        const [curPath, getParams] = req.url.split('?') // [/some/very/long/path , p1=v1&p2=v2&p3=v3]

        const params = {}

        if(getParams){
            const gparams = getParams.split('&') // [p1=v1 , p2=v2 , p3=v3]
            for(let i of gparams){
                const [key, value] = i.split('=')  // [p1 , v1]
                params[key] = value  
            }
        }
        
        req.params = {...req.params, ...params}

        if(curPath === path){
            return true
        }

        const arPath = path.split('/') // /some/:p1/long/:p2 => [some , :p1 , long , :p2]
        const arUrl = curPath.split('/') // /some/very/long/path => [some , very , long , path]

        if(arPath.length !== arUrl.length){
            return false
        }

        for(let i = 0; i < arPath.length; i++){ // [some , :p1 , long , :p2]
            if(arPath[i] !== arUrl[i]){ // :p1 !== very
                if(arPath[i][0] === ':'){ // [:p1][0] === :
                    params[arPath[i].replace(':', '')] = arUrl[i] // params[p1] = very
                }
                else {
                    return false
                }
            }
        }

        req.params = {...req.params, ...params}

        return true
    }

    static async checkAuthorize(req, res){
        // console.log(req.headers)
        const token = req.headers['authorization']
        // console.log('token', token)
        const userId = await TokensModel.getUserIdByToken(token)
        // console.log('userId', userId)
        if(userId){
            req.params = {...req.params, currentUserId:  userId}
            return true
        }
        return false
    }
}