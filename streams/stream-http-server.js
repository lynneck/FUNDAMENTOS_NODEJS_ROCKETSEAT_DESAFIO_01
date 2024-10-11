import  http from 'node:http'
import { Transform } from 'node:stream'


class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log('Transformed', transformed);
        
        callback(null, Buffer.from(String(transformed)))
    }
}

//req => ReadbleStream
//res => WritableStream

const server = http.createServer( async (req, res) => {
    const bufferes = []

    for await (const chunk of req) {
        bufferes.push(chunk)
    }

    const fullStreamContent = Buffer.concat(bufferes).toString()

    console.log(fullStreamContent);
    
    return res.end(fullStreamContent)


    // return req
    // .pipe(new InverseNumber())
    // .pipe(res)
})

server.listen(3334)