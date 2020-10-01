const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer(function (req, res) {
  res.end('Hi')
})

server.listen(port)
console.log(`Server listening on port ${port}`)
