var express = require('express');
var nodeMuse = require("node-muse");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('chat message', function(msg){

	var data = socket.username + ": " + msg;
	io.emit('chat message', data);

  });

  socket.on('add user', function(name){
  	socket.username = name;
  });

	// IMPLEMENT Disconnect button for Muse
//  socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });

  	//comment out setInterval when done testing
  	setInterval(function(){

  		//send fake Muse data to test chat
  		console.log("sending fake data");
        var fakealpha = getRandom(0, 1);
        socket.emit('alpha_relative', fakealpha);
    }, 1000);

	function getRandom(min, max) {
    	return Math.random() * (max - min) + min;
	}

});
