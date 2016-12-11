// server

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

    console.log('a user connected');

    socket.on('chat message', function(msg) {
        msg['username'] = socket.username;
        console.log(msg);
        console.log("sending?");
        io.emit('send to p2', msg);

    });

    socket.on('add user', function(name) {
        socket.username = name;
        console.log(name);
    });

    socket.on('disconnect', () => console.log('a user disconnected'));

});
