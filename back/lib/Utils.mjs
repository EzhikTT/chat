export default class Utils {
    static ROOT_PATH = '/Users/aleksandrpetruhin/Project/front275_messanger/back/'

    static postMethod(req){
        return new Promise((resolve, reject) => {
            const body = []
            req.on('data', (chunk) => {
                body.push(chunk)
            }).on('end', () => {
                const str = Buffer.concat(body).toString()
                const obj = JSON.parse(str)
                return resolve(obj)
            }).on('error', error => {
                return reject(error)
            })
        })
    }
}