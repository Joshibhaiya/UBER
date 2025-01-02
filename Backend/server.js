const http = require('http');
const app = require('./app.js');
const port = process.env.PORT || 9000;





const server = http.createServer(app)

server.listen(port,()=>{
    console.log(`server is runing on port ${port}`)
})