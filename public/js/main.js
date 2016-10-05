$(function() {
	var animationArray = [];
	var socket = io.connect();
	var a = 0;
	var share = "y";
	var ibiarr = [];
	var gsrarr = [];
	var hrv = 0;
	var eda = 0;
	var delta_float;
    var theta_float;
    var alpha_float;
    var beta_float;
    var gamma_float;
    var inf;

	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
    	return false;
	});

	//IMPLEMENT option to share your animation with chat users
// 	$('#share-data').change(function() {
//         if($(this).is(":checked")){
//     		//share with both users
//     		share = "y";
//     	}
//     	else{
//     		share = "n";
//     	}
// 	});

	socket.on('chat message', function(msg){
		var myMessage = $('#messages');
		myMessage.append($('<li>').attr("id", a).attr("class", share).data("sharing", share).text(msg));
		myMessage.scrollTop(myMessage.prop('scrollHeight'));
		//determine the current highest relative band power
		inf = getMax();
		if(eda > 0.5 && hrv > 100){
			inf = "stress";
		}
		//assign animation to the message
		animationArray[a] = inf;
		animateText(removeName(msg));
		a++;
	});

	$("button[name='submit']").click(setUsername);
	$("button[name='connect']").click(connectToMuse);

	// Sets the client's username
	function setUsername() {

  		var name = document.getElementById('usernameInput').value;
  		socket.emit('add user', name);
		document.getElementById("l").style.display = "none";
		document.getElementById("c").style.display = "-webkit-flex";

    	startSending();
	}

	//change band power values to floats in order to be graphed
	// function addDelta(data) {
	// 	delta_float = parseFloat(data);
	// }
	//
	// function addTheta(data) {
	// 	theta_float = parseFloat(data);
	// }

	function addAlpha(data) {
		alpha_float = parseFloat(data);
	}
	//
	// function addBeta(data) {
	// 	beta_float = parseFloat(data);
	// }
	//
	// function addGamma(data) {
	// 	gamma_float = parseFloat(data);
	// }

	//get the highest relative band power
	function getMax() {
		var influence;
    	var max = Math.max(delta_float, theta_float, alpha_float, beta_float, gamma_float);
    	if(delta_float == max){
    		influence = "delta";
    	}
    	else if (theta_float == max){
    		influence = "theta";
    	}
    	else if (alpha_float == max){
    		influence = "alpha";
    	}
    	else if (beta_float == max){
    		influence = "beta";
    	}
    	else if (gamma_float == max){
    		influence = "gamma";
    	}
    	return influence;
	}

	function connectToMuse() {
    	socket.emit('connectmuse');
    	socket.on('muse_connected', function() {
    		console.log("Connected to Muse!");
        	startSending();
    	});
    	startSending();
    	document.getElementById("guy").src = "img/eda1-hrv1.png";
    	connectToE4();
	}

// function disconnectFromMuse() {
//     socket.emit('disconnectmuse');
//     socket.on('muse_disconnect', function() {
//         console.log("muse is disconnected");
//     });
// }

	function connectToE4() {
		var gsr_index = 0;
		var hrv_index = 0;


    	setInterval(function(){
    		$.get("text/ibiData.txt", function(data) {
      			ibiarr = data.split(",");
    		}).done(function() {
            	hrv = 60 / ibiarr[e4_index];
            	hrv_index++;
        	});

    		$.get("text/gsrData.txt", function(data) {
      			gsrarr = data.split(",");
    		}).done(function() {
            	eda = gsrarr[gsr_index];
            	gsr_index++;
							console.log(eda);
        	});

        	changeE4Image(eda, hrv);
    	}, 1000);

    	if(ibiarr[0] !== null && gsrarr[0] !== null){
    		console.log("E4 Connected!");
    	}
	}

	function changeE4Image(conductance, heartRate) {
		if(conductance < 0.3 && heartRate <= 76){
			document.getElementById("guy").src = "img/base.png";
		}
		else if(conductance < 0.3 && heartRate >= 76 && heartRate <= 100){
			document.getElementById("guy").src = "img/eda0-hrv1.png";
		}
		else if(conductance < 0.3 && heartRate >= 100 && heartRate <= 140){
			document.getElementById("guy").src = "img/eda0-hrv2.png";
		}
		else if(conductance < 0.3 && heartRate >= 140){
			document.getElementById("guy").src = "img/eda0-hrv3.png";
		}
		else if(conductance > 0.3 && conductance < 0.5 && heartRate < 76){
			document.getElementById("guy").src = "img/eda1-hrv0.png";
		}
		else if(conductance > 0.5 && conductance < 1 && heartRate < 76){
			document.getElementById("guy").src = "img/eda2-hrv0.png";
		}
		else if(conductance > 1 && heartRate < 76){
			document.getElementById("guy").src = "img/eda3-hrv0.png";
		}
		else if(conductance > 0.3 && conductance < 0.5 && heartRate >= 76 && heartRate <= 100){
			document.getElementById("guy").src = "img/eda1-hrv1.png";
		}
		else if(conductance > 0.3 && conductance < 0.5 && heartRate >= 100 && heartRate <= 140){
			document.getElementById("guy").src = "img/eda1-hrv2.png";
		}
		else if(conductance > 0.3 && conductance < 0.5 && heartRate >= 140){
			document.getElementById("guy").src = "img/eda1-hrv3.png";
		}
		else if(conductance > 0.5 && conductance < 1 && heartRate >= 76 && heartRate <= 100){
			document.getElementById("guy").src = "img/eda2-hrv1.png";
		}
		else if(conductance > 0.5 && conductance < 1 && heartRate >= 100 && heartRate <= 140){
			document.getElementById("guy").src = "img/eda2-hrv2.png";
		}
		else if(conductance > 0.5 && conductance < 1 && heartRate >= 140){
			document.getElementById("guy").src = "img/eda2-hrv3.png";
		}
		else if(conductance > 1 && heartRate >= 76 && heartRate <= 100){
			document.getElementById("guy").src = "img/eda3-hrv1.png";
		}
		else if(conductance > 1 && heartRate >= 100 && heartRate <= 140){
			document.getElementById("guy").src = "img/eda3-hrv2.png";
		}
		else if(conductance > 1 && heartRate >= 140){
			document.getElementById("guy").src = "img/eda3-hrv3.png";
		}
	}

	//send muse data to be graphed
	function startSending() {

    	socket.on('alpha_relative', function(data) {
        	addAlpha(data);
        	addAlphaGraph(data);
    	});
	}

	//when posted chat messages are clicked on, their assigned animation is replayed
	$(document.body).on('click','#messages li',function(evt){

		// alert($(this).data("sharing"));

		var text = document.getElementById(this.id).innerText;

		if($(this).data("sharing") === "y") {

			if(animationArray[parseInt(this.id)] === "alpha"){
				text = removeName(text);
				animateAlpha(text);
			}
			else if(animationArray[parseInt(this.id)] === "beta"){
				text = removeName(text);
				animateBeta(text);
			}
			else if(animationArray[parseInt(this.id)] === "delta"){
				text = removeName(text);
				animateDelta(text);
			}
			else if(animationArray[parseInt(this.id)] === "gamma"){
				text = removeName(text);
				animateGamma(text);
			}
			else if(animationArray[parseInt(this.id)] === "theta"){
				text = removeName(text);
				animateTheta(text);
			}
			else if(animationArray[parseInt(this.id)] === "stress"){
				text = removeName(text);
				animateStress(text);
			}
		}
	});

	//remove the username from the chat message
	function removeName(txt) {
		txt = txt.replace(/^.*?:/, "");
		return txt;
	}

	function animateText(message) {
		if(animationArray[a] == "alpha"){
			animateAlpha(message);
		}
		else if(animationArray[a] === "beta"){
			animateBeta(message);
		}
		else if(animationArray[a] === "delta"){
			animateDelta(message);
		}
		else if(animationArray[a] === "gamma"){
			animateGamma(message);
		}
		else if(animationArray[a] === "theta"){
			animateTheta(message);
		}
		else if(animationArray[a] === "stress"){
			animateStress(message);
		}
	}

	//text animations
	function animateAlpha(message) {
		clearAnimations();
		$('#alpha').css('display', 'block');
		document.getElementById('animate-alpha').innerHTML = message;
	}

	function animateBeta(message) {
		clearAnimations();
		$('#animate-beta').find('span').remove();
    	$('#beta').css('display', 'block');

    	var textArray = message.split("");
    	var prevLetters = "";
    	for (i=0; i < textArray.length-1; i++) {
			prevLetters = prevLetters + textArray[i];
		}
    	$('#animate-beta').append('<span>'+ prevLetters +'</span>');
    	$('#animate-beta').append('<span>'+ textArray[textArray.length-1] +'</span>');
	}

	function animateDelta(message) {
		clearAnimations();
		$('#delta').css('display', 'block');
		document.getElementById('animate-delta').innerHTML = message;
	}

	function animateGamma(message) {
		clearAnimations();
		$('#animate-gamma').find('span').remove();
		$('#animate-gamma').find('p').remove();
    	$('#gamma').css('display', 'block');

    	var sentenceArray = message.split(" ");
		var textArray = sentenceArray[1].split("");
		var s = "";

		for (i=0; i < textArray.length; i++) {
			if(textArray[i] === " "){
				break;
			}
			else {
				$('#animate-gamma').append('<span>'+ textArray[i] +'</span>');
			}
		}
		setTimeout(function () {
		for (t=2; t < sentenceArray.length; t++) {
			s = s + " " + sentenceArray[t];
		}
		$('#animate-gamma').append('<p style="display: inline; font-size: 2em; font-family: Tahoma, Geneva, sans-serif;"> '+ s +'</p>');
		}, 3000);
	}

	function animateTheta(message) {
		clearAnimations();
		$('#theta').css('display', 'block');
		document.getElementById('animate-theta').innerHTML = message;
	}

	function animateStress(message) {
		clearAnimations();
		$('#hrv-eda').css('display', 'block');
		document.getElementById('animate-stress').innerHTML = message;
	}

	function clearAnimations() {
		$('#alpha').css('display', 'none');
		$('#beta').css('display', 'none');
		$('#delta').css('display', 'none');
		$('#gamma').css('display', 'none');
		$('#theta').css('display', 'none');
		$('#hrv-eda').css('display', 'none');
	}

});

function updateTab(evt, pageName) {
	var pageName = 'kp';
	if(document.getElementById('k-tab').innerHTML == '+'){
		openTab(evt, pageName);
	}
	else {
		closeTab(evt, pageName);
	}
}

function openTab(evt, pageName) {
    var i, tabcontent, tablinks;
    document.getElementById('k-tab').innerHTML = '-';

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("kineticpage");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //show the current tab and add an "active" class to the link that opened the tab
    document.getElementById(pageName).style.display = "-webkit-flex";
    document.getElementById("inner-kp").style.display = "inline-block";
    evt.currentTarget.className += " active";
}

function closeTab(evt, pageName) {
	var i, tabcontent, tablinks;
	document.getElementById('k-tab').innerHTML = '+';

    tabcontent = document.getElementsByClassName("kineticpage");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}
