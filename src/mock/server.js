// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
console.log(__dirname)
const router = jsonServer.router(path.join(__dirname, 'mock.json'))
const middlewares = jsonServer.defaults()
const port = 5000

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.method = 'GET'
    req.query = req.body
  }
  next()
})
server.use('/auth/banma', function (req, res) {
  res.redirect('/auth')
})
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running at: ' + port)
})
