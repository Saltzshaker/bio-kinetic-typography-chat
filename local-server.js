var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket_remote = require('socket.io-client')('https://biofeedback-kt.herokuapp.com');

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/smoothie/'));

http.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        console.log(msg);
        console.log("sending to server");
        socket_remote.emit('send to server', msg);
    });

    socket_remote.on('send to client', function(msg) {
        socket.emit('send to p2', msg);
    });

    socket.on('add user', function(name) {
        socket.username = name;
    });

    socket.on('disconnect', () => console.log('a user disconnected'));
});