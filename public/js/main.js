// current EDA
var e;
var gsrarr;
var gsr_index = 0;
var socket = io.connect();

// define empty animation array with animation object
$(function() {
	var animationArray = [];
	var share = "y";
	var gsrarr = [];
	var eda = 0;
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

	// try to get live animations
	function liveAnimate() {
		$('#m').keyup(function() {
			// the input being typed by the user
			var input = $('#m').val();

			// assign animation to the message influence determined by plotGSRData() in linegraph.js
			animationArray[a] = inf;
			animateText(removeName(input));
			animatePreview(removeName(input));
		});
	}

	liveAnimate();

	// To do: When chat message is sent, if sharing is on, add animation to chat window

	socket.on('chat message', function(msg){
		var myMessage = $('#messages');
		myMessage.append($('<li>').attr("id", a).attr("class", share).data("sharing", share).text(msg));
		myMessage.scrollTop(myMessage.prop('scrollHeight'));

		// assign animation to the message
		animationArray[a] = inf;
		animateText(removeName(msg));
		animatePreview(removeName(msg));
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

	//remove the username from the chat message
	function removeName(txt) {
		txt = txt.replace(/^.*?:/, "");
		return txt;
	}

	function animateText(message) {
		if(animationArray[a] == "stressed"){
			animateShake(message);
		}

		else if(animationArray[a] === "chill"){
			animateSquash(message);
		}
	}

	function animatePreview(message) {
		animateShake(message);
		animateJump(message);
		animateSwing(message);
		animateTilt(message);
		animateSquash(message);
	}

	//text animations
	// function animatejump(message) {
	// 	clearAnimations();
	// 	$('#jump').css('display', 'block');
	// 	document.getElementById('animate-jump').innerHTML = message;
	// }

//////////////////// ADD ANIMATIONS TO PREVIEW & MODAL ////////////////////

	// jumps up and down
	function animateJump(message) {
		clearAnimations();
		$('#jump').css('display', 'block');
		$('#jump-preview').css('display', 'block');
		document.getElementById('animate-jump').innerHTML = message;
		document.getElementById('animate-jump-preview').innerHTML = message;
	}

	// last letter slowly swings
	function animateSwing(message) {
		clearAnimations();
		$('#animate-swing').find('span').remove();
		$('#animate-swing-preview').find('span').remove();
		$('#swing').css('display', 'block');
		$('#swing-preview').css('display', 'block');

		var textArray = message.split("");
		var prevLetters = "";
		for (i=0; i < textArray.length-1; i++) {
			prevLetters = prevLetters + textArray[i];
		}
		$('#animate-swing').append('<span>'+ prevLetters +'</span>');
		$('#animate-swing').append('<span>'+ textArray[textArray.length-1] +'</span>');

		$('#animate-swing-preview').append('<span>'+ prevLetters +'</span>');
		$('#animate-swing-preview').append('<span>'+ textArray[textArray.length-1] +'</span>');
	}

	// shakes back and forth quickly
	function animateShake(message) {
		clearAnimations();
		$('#shake').css('display', 'block');
		$('#shake-preview').css('display', 'block');
		document.getElementById('animate-shake').innerHTML = message;
		document.getElementById('animate-shake-preview').innerHTML = message;
	}

	// squashes text
	function animateSquash(message) {
		clearAnimations();
		$('#squash').css('display', 'block');
		$('#squash-preview').css('display', 'block');
		document.getElementById('animate-squash').innerHTML = message;
		document.getElementById('animate-squash-preview').innerHTML = message;
	}

	// large and slow tilt
	function animateTilt(message) {
		clearAnimations();
		$('#tilt').css('display', 'block');
		$('#tilt-preview').css('display', 'block');
		document.getElementById('animate-tilt').innerHTML = message;
		document.getElementById('animate-tilt-preview').innerHTML = message;
	}

	function clearAnimations() {
		$('#jump').css('display', 'none');
		$('#swing').css('display', 'none');
		$('#squash').css('display', 'none');
		$('#gamma').css('display', 'none');
		$('#tilt').css('display', 'none');
		$('#shake').css('display', 'none');
	}

});

//////////////////// TABS ////////////////////

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
		tabcontent[i].style.display = "display: -webkit-flex;";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	//show the current tab and add an "active" class to the link that opened the tab
	document.getElementById(pageName).style.display = "-webkit-flex";
	// document.getElementById("inner-kp").style.display = "inline-block";
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
