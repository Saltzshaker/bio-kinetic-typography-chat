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
      var input = $('#m').val();
      animationArray[a] = inf;
      animateText(removeName(input));
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
			animateStress(message);
      // animateAlpha(message);
      // animateBeta(message);
      // animateGamma(message);
      // animateTheta(message);
		}

		else if(animationArray[a] === "chill"){
			animateChill(message);
		}
	}

	//text animations
	// function animateAlpha(message) {
	// 	clearAnimations();
	// 	$('#alpha').css('display', 'block');
	// 	document.getElementById('animate-alpha').innerHTML = message;
	// }

  // jumps up and down
  function animateAlpha(message) {
		clearAnimations();
		$('#alpha').css('display', 'block');
		document.getElementById('animate-alpha').innerHTML = message;
	}

  // last letter slowly swings
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

  // shakes back and forth quickly
  function animateStress(message) {
    clearAnimations();
    $('#hrv-eda').css('display', 'block');
    document.getElementById('animate-stress').innerHTML = message;
  }

  // squashes text
	function animateChill(message) {
		clearAnimations();
		$('#delta').css('display', 'block');
		document.getElementById('animate-delta').innerHTML = message;
	}

  //not working
  function animateGamma(message) {
		clearAnimations();
		$('#animate-gamma').find('span').remove();
		$('#animate-gamma').find('p').remove();
    	$('#gamma').css('display', 'block');

    var sentenceArray = message.split("");
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

  // large and slow tilt
  function animateTheta(message) {
		clearAnimations();
		$('#theta').css('display', 'block');
		document.getElementById('animate-theta').innerHTML = message;
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
