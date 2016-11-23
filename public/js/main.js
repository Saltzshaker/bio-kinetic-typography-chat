// current EDA
var e;
var gsrarr;
var gsr_index = 0;
var socket = io.connect();
var input;
var a = 0;
var effect;
var index = 0;

// define empty animation array with animation object
$(function() {
    var share = "y";
    var gsrarr = [];
    var eda = 0;

    // when form is submitted, add the message
    $('form').submit(function() {
        socket.emit('chat message', $('#m').val());
        message = $('#m').val('');
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

    // Add text animations to box as the user types
    function liveAnimate() {
        $('#m').keyup(function() {
            // the input being typed by the user
            input = $('#m').val();

            // assign animation to the message influence determined by plotGSRData() in linegraph.js
            animatePreview(removeName(input));
            if (effect == null){
              animateShake(removeName(input));
            }
            else if (effect == "swing") {
              animateSwing(removeName(input));
            }
            else if (effect == "bounce") {
              animateBounce(removeName(input));
            }
            else if (effect == "floating") {
              animateFloating(removeName(input));
            }
            else if (effect == "shake") {
              animateShake(removeName(input));
            }
            else if (effect == "squash") {
              animateSquash(removeName(input));
            }
        });
    }

    // Run the liveAnimate function
    liveAnimate();

    // On click
    $(document.body).on('mouseover','#messages li',function(evt){
		// alert($(this).data("sharing"));
		// var text = document.getElementById(this.id).innerText;
		  // if($(this).data("sharing") == "y") {
        // $(this).addClass("shake-li").css('display', 'block');
        console.log("mouseover");

  // }
	});

    $(document.body).on('mouseout','#messages li',function(evt){
		// alert($(this).data("sharing"));
		// var text = document.getElementById(this.id).innerText;
		// if($(this).data("sharing") === "y") {
      console.log("mouseout");
			if(inf == "high"){
        $(this).removeClass("shake");
			}
			else if(inf == "low"){
        $(this).removeClass("squash");
			}
  // }
	});


//////////// On click in animation library, swap out animateText ////////////

    $("#floating-preview").click(function() {
        effect = "floating";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateFloating(removeName(input));
    });

    $("#swing-preview").click(function() {
        effect = "swing";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateSwing(removeName(input));
    });

    $("#bounce-preview").click(function() {
        effect = "bounce";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateBounce(removeName(input));
    });

    $("#shake-preview").click(function() {
        effect = "shake";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateShake(removeName(input));
    });

    $("#squash-preview").click(function() {
        effect = "squash";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateSquash(removeName(input));
    });

    // To do: When chat message is sent, if sharing is on, add animation to chat window

    socket.on('chat message', function(msg) {
        var myMessage = $('#messages');
        myMessage.append($('<li>').attr("id", "li" + a).attr("class", share).data("sharing", share).text(msg));
        myMessage.scrollTop(myMessage.prop('scrollHeight'));

        //increment li id value
        // var shakeLi = $('#li' + a).addClass("shake-li").css('display', 'block');
        // var swingLi = $('#li' + a).addClass("swing-li").css('display', 'block');
        // var bounceLi = $('#li' + a).addClass("bounce-li").css('display', 'block');
        // var floatingLi = $('#li' + a).addClass("floating-li").css('display', 'block');
        // var squashLi = $('#li' + a).addClass("squash-li").css('display', 'block');


        // $('#li' + a).addClass("shake-li").css('display', 'block');
        // assign animation to the message
        if (effect == undefined){
          var currentLi = ("#li" + a).toString();
          console.log("currentLi in if: " + currentLi);
          $(currentLi).addClass("shake-li").css('display', 'block');
          a++;
        }

        else if (effect == "swing") {
          $('#li' + a).addClass("swing-li").css('display', 'block');
          a++;
          console.log("swing!");
        }

        else if (effect == "bounce") {
          bounceLi = $('#li' + a).addClass("bounce-li").css('display', 'block');
          a++;
          console.log("bounce!");
        }

        else if (effect == "floating") {
          floatingLi = $('#li' + a).addClass("floating-li").css('display', 'block');
          a++;
          console.log("floating!");
        }

        else if (effect == "shake") {
          $(currentLi).addClass("shake-li").css('display', 'block');
          a++;
          console.log("shaking!");
        }

        else if (effect == "squash") {
          squashLi = $('#li' + a).addClass("squash-li").css('display', 'block');
          a++;
          console.log("squashing!");
        }
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

		// // Animate text in main animation box
		// $('#previewModal').on('hidden.bs.modal', function() {
		// 	$("#animate-squash-preview").removeClass("selected-effect-border");
		// 	$("#animate-shake-preview").removeClass("selected-effect-border");
		// });

    // animate all text effects in preview box
    function animatePreview(message) {
        shakePreview(message);
        bouncePreview(message);
        swingPreview(message);
        squashPreview(message);
        floatingPreview(message);
    }

//////////// Animate in main preview div ////////////

    // bounces up and down
    function animateBounce(message) {
        clearAnimations();
        $('#bounce').css('display', 'block');

        if (inf == "low") {
          document.getElementById("bounce").style.animationDuration = "2s";
        }
        else {
          document.getElementById("bounce").style.animationDuration = ".3s";
        }

        document.getElementById('bounce').innerHTML = message;
    }

    // animation swings
    function animateSwing(message) {
        clearAnimations();
        $('#swing').find('span').remove();
        $('#swing').css('display', 'block');

        if (inf == "low") {
          document.getElementById("swing").style.animationDuration = "1s";
        }
        else {
          document.getElementById("swing").style.animationDuration = ".3s";
        }

        document.getElementById('swing').innerHTML = message;
    }

    // shakes back and forth quickly
    function animateShake(message) {
        clearAnimations();
        $('#shake').css('display', 'block');

        if (inf == "low") {
          document.getElementById("shake").style.animationDuration = "10s";
        }
        else {
          document.getElementById("shake").style.animationDuration = ".8s";
        }

        document.getElementById('shake').innerHTML = message;
    }

    // squashes text
    function animateSquash(message) {
        clearAnimations();
        $('#squash').css('display', 'block');
        console.log("squash inf: " + inf);
        if (inf == "low") {
          document.getElementById("squash").style.animationDuration = "3s";
        }
        else {
          document.getElementById("squash").style.animationDuration = "1s";
        }

        document.getElementById('squash').innerHTML = message;
    }

    function animateFloating(message) {
        clearAnimations();
        // display animation
        $('#floating').css('display', 'block');

        if (inf == "low") {
          document.getElementById("floating").style.animationDuration = "10s";
        }
        else {
          document.getElementById("floating").style.animationDuration = ".3s";
        }

        document.getElementById('floating').innerHTML = message;
    }

//////////// Animate in effect library ////////////

    // bounces up and down
    function bouncePreview(message) {
        $('#bounce-preview').css('display', 'block');

        if (inf == "low") {
          document.getElementById("bounce-preview").style.animationDuration = "2s";
        }
        else {
          document.getElementById("bounce-preview").style.animationDuration = ".3s";
        }

        document.getElementById('bounce-preview').innerHTML = message;
    }

    // last letter slowly swings
    function swingPreview(message) {
        $('#swing-preview').find('span').remove();
        $('#swing-preview').css('display', 'block');

        if (inf == "low") {
          document.getElementById("swing-preview").style.animationDuration = "1s";
        }
        else {
          document.getElementById("swing-preview").style.animationDuration = ".3s";
        }

        document.getElementById('swing-preview').innerHTML = message;
    }

    // shakes back and forth quickly
    function shakePreview(message) {
        $('#shake-preview').css('display', 'block');

        if (inf == "low") {
          document.getElementById("shake-preview").style.animationDuration = "10s";
        }
        else {
          document.getElementById("shake-preview").style.animationDuration = ".8s";
        }

        document.getElementById('shake-preview').innerHTML = message;
    }

    // squashes text
    function squashPreview(message) {
        $('#squash-preview').css('display', 'block');

        if (inf == "low") {
          document.getElementById("squash-preview").style.animationDuration = "3s";
        }
        else {
          document.getElementById("squash-preview").style.animationDuration = "1s";
        }

        document.getElementById('squash-preview').innerHTML = message;
    }

    // large and slow tilt
    function floatingPreview(message) {
        $('#floating-preview').css('display', 'block');

        if (inf == "low") {
          document.getElementById("floating-preview").style.animationDuration = "10s";
        }
        else {
          document.getElementById("floating-preview").style.animationDuration = ".3s";
        }

        document.getElementById('floating-preview').innerHTML = message;
    }

//////////////////// Clear animations ////////////////////

    function clearAnimations() {
        $('#bounce').css('display', 'none');
        $('#swing').css('display', 'none');
        $('#squash').css('display', 'none');
        $('#floating').css('display', 'none');
        $('#shake').css('display', 'none');
    }

});
