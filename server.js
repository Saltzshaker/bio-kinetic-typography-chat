var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/smoothie/'));


http.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log('a user connected!');
    socket.on('send to server', function(msg) {
        console.log(msg);
        console.log('server received the msg');
        io.emit('send to client', msg);
    });
});