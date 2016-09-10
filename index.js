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
        var fakedelta = getRandom(0, 1);
        var faketheta = getRandom(0, 1);
        var fakealpha = getRandom(0, 1);
        var fakebeta = getRandom(0, 1);
        var fakegamma = getRandom(0, 1);
        socket.emit('delta_relative', fakedelta);
        socket.emit('theta_relative', faketheta);
        socket.emit('alpha_relative', fakealpha);
        socket.emit('beta_relative', fakebeta);
        socket.emit('gamma_relative', fakegamma);
    }, 1000);
        
	function getRandom(min, max) {
    	return Math.random() * (max - min) + min;
	}
  
//   socket.on('connectmuse', function() {
//         
//   	var muse = nodeMuse.connect().Muse;
//   	
//   	// only send once every second
//     var deltanow = Date.now();
//     var deltalast = Date.now();
//     var thetanow = Date.now();
//     var thetalast = Date.now();
//     var alphanow = Date.now();
//     var alphalast = Date.now();
//     var betanow = Date.now();
//     var betalast = Date.now();
//     var gammanow = Date.now();
//     var gammalast = Date.now();
//   
//   	muse.on('connected', function() {
//             socket.emit('muse_connected');
//             console.log("we connected");
//     });
// 
//     muse.on('uncertain', function(){
//             // for some reason muse can't be detected
//             // waiting for new signals to arrive
//             socket.emit('muse_uncertain');
//     });
// 
//     muse.on('disconnected', function() {
//             socket.emit('muse_unintended_disconnect');
//     });
//     
//     
// // get relative data from muse, these values will be between 0 and 1
// // see: http://developer.choosemuse.com/research-tools/available-data#Relative_Band_Powers
//         muse.on('/muse/elements/delta_relative', function(data){
//             deltanow = Date.now();
//             console.log(data);
//             var deltadata = averageChannelData(data);
//             if (checkTime(deltanow, deltalast)) {
//                 deltalast = deltanow;
//                 socket.emit('delta_relative', deltadata);
//             }
//         });
// 
//         muse.on('/muse/elements/theta_relative', function(data){
//             thetanow = Date.now();
//             var thetadata = averageChannelData(data);
//             if (checkTime(thetanow, thetalast)) {
//                 thetalast = thetanow;
//                 socket.emit('theta_relative', averageChannelData(data));
//             }
//         });
// 
//         muse.on('/muse/elements/alpha_relative', function(data){
//             alphanow = Date.now();
//             var alphadata = averageChannelData(data);
//             if (checkTime(alphanow, alphalast)) {
//                 alphalast = alphanow;
//                 socket.emit('alpha_relative', averageChannelData(data));
//             }
//         });
// 
//         muse.on('/muse/elements/beta_relative', function(data){
//             betanow = Date.now();
//             var betadata = averageChannelData(data);
//             if (checkTime(betanow, betalast)) {
//                 betalast = betanow;
//                 socket.emit('beta_relative', averageChannelData(data));
//             }
//         });
// 
//         muse.on('/muse/elements/gamma_relative', function(data){
//             gammanow = Date.now();
//             var gammadata = averageChannelData(data);
//             if (checkTime(gammanow, gammalast)) {
//                 gammalast = gammanow;
//                 socket.emit('gamma_relative', averageChannelData(data));
//             }
//         });
//   
//   });
//   
//   socket.on('disconnectmuse', function() {
//         nodeMuse.disconnect();
//         socket.emit('muse_disconnect');
//   });
//   
});

function averageChannelData(data) {
    var sum = 0;
    var numValidChannels = 0;
    var leftback = -1;
    var leftfront = -1;
    var rightfront = -1;
    var rightback = -1;
    var changed = false;
    if (!isNaN(data.values[0])) {
        sum += data.values[0];
        numValidChannels++;
        leftback = 1;
    }
    if (!isNaN(data.values[1])) {
        sum += data.values[1];
        numValidChannels++;
        leftfront = 1;
    }
    if (!isNaN(data.values[2])) {
        sum += data.values[2];
        numValidChannels++;
        rightfront = 1;
    }
    if (!isNaN(data.values[3])) {
        sum += data.values[3];
        numValidChannels++;
        rightback = 1;
    }
    var average = sum / numValidChannels;
    return average;
}

function checkTime(currentTime, lastTime) {
    if ((currentTime - lastTime >= 1000) || (lastTime - currentTime >= 1000)) {
        return true;
    }
    return false;
}


