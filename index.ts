import * as http from 'http'
import * as fs from 'fs'
import { IncomingMessage, ServerResponse } from 'http'
import * as p from 'path'

const server = http.createServer()
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (req: IncomingMessage, res: ServerResponse) => {
    const { method, url: path, headers } = req
    
     // 从URL路径中提取不包括查询参数的部分
     const fileName = path?.split('?')[0].slice(1) || 'index.html';
    const filePath = p.resolve(publicDir, fileName)
    fs.readFile(filePath,
        (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.statusCode = 404
                    res.end(`File ${fileName} not found!`)
                }
                else {
                    res.statusCode = 500
                    res.end(`Internal Server Error: ${err.code}`)
                }
            }
            else {  
                res.statusCode = 200
                res.end(data)
            }
        }
    )
})
server.listen(8888)