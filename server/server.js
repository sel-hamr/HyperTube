const http = require('http')
const app = require('./app')
const { port } = require('./configs/indexConfig')

const server = http.createServer(app)

server.listen(port)
