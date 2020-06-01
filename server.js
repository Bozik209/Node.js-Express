const http = require('http');
const app = require('./app')
const port = 3000

// option 1
// func that run and manager the server
// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/plain"});
//     res.write('hello world');
//     res.end();
// })


// option 2 
// when exprees run and manager the server
const server = http.createServer(app)

server.listen(port);