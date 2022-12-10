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

        // console.log('set params', req)
        
        const [curPath, getParams] = req.url.split('?')

        const params = {}

        if(getParams){
            const gparams = getParams.split('&')
            for(let i of gparams){
                const [key, value] = i.split('=')
                params[key] = value
            }
        }
        
        req.params = {...req.params, ...params}

        if(curPath === path){
            return true
        }

        const arPath = path.split('/')
        const arUrl = curPath.split('/')

        if(arPath.length !== arUrl.length){
            return false
        }

        for(let i = 0; i < arPath.length; i++){
            if(arPath[i] !== arUrl[i]){
                if(arPath[i][0] === ':'){
                    params[arPath[i].replace(':', '')] = arUrl[i]
                }
                else {
                    return false
                }
            }
        }

       

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