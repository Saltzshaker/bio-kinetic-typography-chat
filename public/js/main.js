// current EDA
var e;
var gsrarr;
var gsr_index = 0;
var socket = io.connect();
var input;
var a = 0;

// define empty animation array with animation object
$(function() {
    var share = "y";
    var gsrarr = [];
    var eda = 0;

    // when form is submitted, add the message
    $('form').submit(function() {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    //IMPLEMENT option to share your animation with chat users
    $('#share-data').change(function() {
        if ($(this).is(":checked")) {
            //share with both users
            share = "y";
        } else {
            share = "n";
        }
    });

    // try to get live animations
    function liveAnimate() {
        $('#m').keyup(function() {
            // the input being typed by the user
            input = $('#m').val();

            // assign animation to the message influence determined by plotGSRData() in linegraph.js
            animateText(removeName(input));
            animatePreview(removeName(input));
        });
    }

    // Run the liveAnimate function
    liveAnimate();

    // On click in animation library, swap out animateText
    $("#animate-tilt-preview").click(function() {
        console.log("tilt click");
        $('#myModal').modal('toggle');
        input = $('#m').val();
        console.log(input);
        inf = "tilty";
        animateText(removeName(input));
    });

    $("#animate-swing-preview").click(function() {
        console.log("swing click");
        $('#myModal').modal('toggle');
        input = $('#m').val();
        console.log(input);
        inf = "swingy";
        animateText(removeName(input));
    });

    $("#animate-jump-preview").click(function() {
        console.log("jump click");
        $('#myModal').modal('toggle');
        input = $('#m').val();
        console.log(input);
        inf = "jumpy";
        animateText(removeName(input));
    });

    $("#animate-shake-preview").click(function() {
        console.log("jump click");
        $('#myModal').modal('toggle');
        input = $('#m').val();
        console.log(input);
        inf = "stressed";
        animateText(removeName(input));
    });

    $("#animate-squash-preview").click(function() {
        console.log("jump click");
        $('#myModal').modal('toggle');
        input = $('#m').val();
        console.log(input);
        inf = "chill";
        animateText(removeName(input));
    });


    // To do: When chat message is sent, if sharing is on, add animation to chat window

    socket.on('chat message', function(msg) {
        var myMessage = $('#messages');
        myMessage.append($('<li>').attr("id", a).attr("class", share).data("sharing", share).text(msg));
        myMessage.scrollTop(myMessage.prop('scrollHeight'));

        // assign animation to the message
        animateText(removeName(msg));
        animatePreview(removeName(msg));
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

		// Animate text in main animation box
		$('#myModal').on('hidden.bs.modal', function() {
			$("#animate-squash-preview").removeClass("selected-effect-border");
			$("#animate-shake-preview").removeClass("selected-effect-border");
		});

    function animateText(message) {
        console.log(inf);

        if (inf === "stressed") {
            animateShake(message);
            $("#animate-shake-preview").addClass("selected-effect-border");

        }


        else if (inf === "chill") {
            animateSquash(message);
            $("#animate-squash-preview").addClass("selected-effect-border");

        } else if (inf === "jumpy") {
            animateJump(message);
						$("#animate-squash-preview").addClass("selected-effect-border");

        } else if (inf === "swingy") {
            animateSwing(message);
						$("#animate-squash-preview").addClass("selected-effect-border");

        } else if (inf === "tilty") {
            animateTilt(message);
						$("#animate-squash-preview").addClass("selected-effect-border");
        }
    }

    // animate all text effects in preview box
    function animatePreview(message) {
        animateShakePreview(message);
        animateJumpPreview(message);
        animateSwingPreview(message);
        animateTiltPreview(message);
        animateSquashPreview(message);
    }

    //////////////////// ADD ANIMATIONS TO PREVIEW & MODAL ////////////////////

    // Animate in main box //

    // jumps up and down
    function animateJump(message) {
        clearAnimations();
        $('#jump').css('display', 'block');
        document.getElementById('animate-jump').innerHTML = message;
    }

    // last letter slowly swings
    function animateSwing(message) {
        clearAnimations();
        $('#animate-swing').find('span').remove();
        $('#swing').css('display', 'block');

        var textArray = message.split("");
        var prevLetters = "";
        for (i = 0; i < textArray.length - 1; i++) {
            prevLetters = prevLetters + textArray[i];
        }
        $('#animate-swing').append('<span>' + prevLetters + '</span>');
        $('#animate-swing').append('<span>' + textArray[textArray.length - 1] + '</span>');
    }

    // shakes back and forth quickly
    function animateShake(message) {
        clearAnimations();
        $('#shake').css('display', 'block');
        document.getElementById('animate-shake').innerHTML = message;
    }

    // squashes text
    function animateSquash(message) {
        clearAnimations();
        $('#squash').css('display', 'block');
        document.getElementById('animate-squash').innerHTML = message;
    }

    // large and slow tilt
    function animateTilt(message) {
        clearAnimations();
        $('#tilt').css('display', 'block');
        document.getElementById('animate-tilt').innerHTML = message;
    }

    //// Animate in effect library /////

    // jumps up and down
    function animateJumpPreview(message) {
        $('#jump-preview').css('display', 'block');
        document.getElementById('animate-jump-preview').innerHTML = message;
    }

    // last letter slowly swings
    function animateSwingPreview(message) {
        $('#animate-swing-preview').find('span').remove();
        $('#swing-preview').css('display', 'block');

        var textArray = message.split("");
        var prevLetters = "";
        for (i = 0; i < textArray.length - 1; i++) {
            prevLetters = prevLetters + textArray[i];
        }

        $('#animate-swing-preview').append('<span>' + prevLetters + '</span>');
        $('#animate-swing-preview').append('<span>' + textArray[textArray.length - 1] + '</span>');
    }

    // shakes back and forth quickly
    function animateShakePreview(message) {
        $('#shake-preview').css('display', 'block');
        document.getElementById('animate-shake').innerHTML = message;
        document.getElementById('animate-shake-preview').innerHTML = message;
    }

    // squashes text
    function animateSquashPreview(message) {
        $('#squash-preview').css('display', 'block');
        document.getElementById('animate-squash-preview').innerHTML = message;
    }

    // large and slow tilt
    function animateTiltPreview(message) {
        $('#tilt-preview').css('display', 'block');
        document.getElementById('animate-tilt-preview').innerHTML = message;
    }

    //// Clear animations /////

    function clearAnimations() {
        $('#jump').css('display', 'none');
        $('#swing').css('display', 'none');
        $('#squash').css('display', 'none');
        $('#tilt').css('display', 'none');
        $('#shake').css('display', 'none');
    }

});

//////////////////// TABS ////////////////////

function updateTab(evt, pageName) {
    var pageName = 'kp';
    if (document.getElementById('k-tab').innerHTML == '+') {
        openTab(evt, pageName);
    } else {
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
