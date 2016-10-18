// current EDA
var e;
var gsrarr;
var gsr_index = 0;

// define empty animation array with animation object
$(function() {
	var animationArray = [];
	var socket = io.connect();
	var share = "y";
	var gsrarr = [];
	var eda = 0;
  var inf;
	var a = 0;

// when form is submitted, add the message
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
    	return false;
	});

	//IMPLEMENT option to share your animation with chat users
	$('#share-data').change(function() {
        if($(this).is(":checked")){
    		//share with both users
    		share = "y";
    	}
    	else{
    		share = "n";
    	}
	});

	socket.on('chat message', function(msg){
		var myMessage = $('#messages');
		myMessage.append($('<li>').attr("id", a).attr("class", share).data("sharing", share).text(msg));
		myMessage.scrollTop(myMessage.prop('scrollHeight'));

		//determine the current highest relative band power
		if(e < 0.5){
			inf = "stress";
		}

		// assign animation to the message
		animationArray[a] = "alpha";
		animateText(removeName(msg));
		a++;
	});

	$("button[name='submit']").click(setUsername);

	// Sets the client's username
	function setUsername() {
		var name = document.getElementById('usernameInput').value;
		socket.emit('add user', name);
		document.getElementById("l").style.display = "none";
		document.getElementById("c").style.display = "-webkit-flex";
  	// startSending();
	}

	//when posted chat messages are clicked on, their assigned animation is replayed
	$(document.body).on('click','#messages li',function(evt){

		// alert($(this).data("sharing"));

		var text = document.getElementById(this.id).innerText;

		// if($(this).data("sharing") === "y") {
		//
		// 	if(animationArray[parseInt(this.id)] === "alpha"){
		// 		text = removeName(text);
				animateAlpha(text);
			// }
			// else if(animationArray[parseInt(this.id)] === "beta"){
			// 	text = removeName(text);
			// 	animateBeta(text);
			// }
			// else if(animationArray[parseInt(this.id)] === "delta"){
			// 	text = removeName(text);
			// 	animateDelta(text);
			// }
			// else if(animationArray[parseInt(this.id)] === "gamma"){
			// 	text = removeName(text);
			// 	animateGamma(text);
			// }
			// else if(animationArray[parseInt(this.id)] === "theta"){
			// 	text = removeName(text);
			// 	animateTheta(text);
			// }
			// else if(animationArray[parseInt(this.id)] === "stress"){
			// 	text = removeName(text);
			// 	animateStress(text);
			// }
		// }
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
