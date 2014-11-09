var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var fs = require('fs')

var messages = {}

server.listen(8080)
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html')
})

io.on('connection', function(socket) {
    socket.on('message', function(data) {
        messages[data.from] = data.content
        socket.broadcast.emit('message', data)
    })
    socket.on('all', function(data) {
        for (var from in messages) {
            socket.emit('message', {
                from: from,
                content: messages[from]
            })
        }
    })
})