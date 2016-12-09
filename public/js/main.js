// connect to socket
var socket = io.connect();
// chat message input
var input;
// increment a to get chat message li index
var a = 0;
var effect = "shake";
var sharingOn = true;
var currentEffect;


$(function() {

    /*------------------------------------------------------------------------------
                                  Function calls
    ------------------------------------------------------------------------------*/

    /*----------
    Animate main div and preview text as a user types with animatePreview() and conditionals based on effect
    ----------*/
    liveAnimate();

    /*------------------------------------------------------------------------------
                                      Socket
    ------------------------------------------------------------------------------*/


    /*----------
    On chat message, append unique li with index and add current effect to play once
    ----------*/
  function addOnMsg() {
        var myMessage = $('#messages');
        myMessage.append($('<li>').attr("id", "li" + a).attr("class", sharingOn + "-sharing").data("sharing", sharingOn).text(msg));
        myMessage.scrollTop(myMessage.prop('scrollHeight'));

        if (effect == null && sharingOn) {
            $('#li' + a).css('-webkit-animation-iteration-count', "1");
            $('#li' + a).append($('<span>').attr("class", "glyphicon glyphicon-ok-sign"));
            getAnimationSpeed();
        } else if (sharingOn) {
            $('#li' + a).addClass(effect + "-li").css('display', 'block');
            $('#li' + a).css('-webkit-animation-iteration-count', "1");
            $('#li' + a).append($('<span>').attr("class", "glyphicon glyphicon-ok-sign"));
            getAnimationSpeed();
        }
        a++;
    }

    /*----------
    Sets the client's username and emit to other user
    ----------*/
    function setUsername() {
        var name = document.getElementById('usernameInput').value;
        socket.emit('add user', name);
        document.getElementById("l").style.display = "none";
        document.getElementById("c").style.display = "-webkit-flex";
    }

    /*----------
    When chat form is submitted, add the message and emit to other user
    ----------*/
    $('form').submit(function() {
        var sendMsg = createMsg();
        socket.emit('chat message', sendMsg);
        return false;
    });

    // gets msg info from p1
    socket.on('send to p2', function(msg) {
        console.log(msg);
        var sentTxt = msg["txt"];
        var sentShare = msg["sharingOn"];
        var sentLi = msg["li_id"];
        var sentSpeed = msg["speed"];
        var sentEffect = msg["effect"];
        var myMessage = $('#messages');
        myMessage.append($('<li>').attr("id", sentLi).attr("class", sentShare + "-sharing").data("sharing", sentShare).text(sentTxt));
        myMessage.scrollTop(myMessage.prop('scrollHeight'));

        if (sentEffect == null && sentShare) {
            $('#' + sentLi).css('-webkit-animation-iteration-count', "1");
            $('#' + sentLi).append($('<span>').attr("class", "glyphicon glyphicon-ok-sign"));
            $('#' + sentLi).css('animationDuration', sentSpeed);

        } else if (sentShare) {
            console.log('sharing');
            $('#' + sentLi).addClass(sentEffect + "-li").css('display', 'block');
            $('#' + sentLi).css('-webkit-animation-iteration-count', "1");
            $('#' + sentLi).append($('<span>').attr("class", "glyphicon glyphicon-ok-sign"));
            sentSpeed;
        }
        $('#' + sentLi).css('animationDuration', sentSpeed);
        a++;
    });

    function createMsg () {
    // get json of li effect class, id, speed, sharing, text
      var msg = {
      "txt": $('#m').val(),
      "sharingOn": sharingOn,
      "li_id": "li" + a,
      "speed": getAnimationSpeed(),
      "effect": effect
      }
      a++;
      return msg;
  }


    /*------------------------------------------------------------------------------
                                jQuery event handlers
    ------------------------------------------------------------------------------*/

    /*----------
    Checkbox
    ----------*/
    $('#share-data').click(function() {
        if($(this).is(':checked')) {
            sharingOn = true;
        }
        else {
            sharingOn = false;
        }
    });

    /*----------
    Mousing over and out chat messages
    ----------*/
    $(document.body).on('mouseover', '#messages li', function(evt) {
        $(this).css('-webkit-animation-iteration-count', "infinite");
    });

    $(document.body).on('mouseout', '#messages li', function(evt) {
        $(this).css('-webkit-animation-iteration-count', "0");
        console.log("mouseout");
    });

    /*----------
    On submit click, set username
    ----------*/
    $("button[name='submit']").click(setUsername);

    /*----------
    Add border to current effect selected in effect library
    ----------*/

    $("#effect-btn").click(function() {
      currentEffect = effect + "-preview";
      $("#" + currentEffect).addClass("selected-effect-border");
      console.log(currentEffect);
    });

    /*----------
    On click in effect library, close modal and set new animation effect in main div
    ----------*/
    $("#floating-preview").click(function() {
        $("#" + currentEffect).removeClass("selected-effect-border");
        effect = "floating";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateFloating(removeName(input));
    });

    $("#swing-preview").click(function() {
        $("#" + currentEffect).removeClass("selected-effect-border");
        effect = "swing";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateSwing(removeName(input));
    });

    $("#bounce-preview").click(function() {
        $("#" + currentEffect).removeClass("selected-effect-border");
        effect = "bounce";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateBounce(removeName(input));
    });

    $("#shake-preview").click(function() {
        $("#" + currentEffect).removeClass("selected-effect-border");
        effect = "shake";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateShake(removeName(input));
    });

    $("#squash-preview").click(function() {
        $("#" + currentEffect).removeClass("selected-effect-border");
        effect = "squash";
        $('#previewModal').modal('toggle');
        input = $('#m').val();
        animateSquash(removeName(input));
    });

    /*------------------------------------------------------------------------------
                                JS METHODS
    ------------------------------------------------------------------------------*/
    function getAnimationSpeed() {
      var speed;

        if (effect == 'bounce') {
            if (inf == 'low') {
                speed = '2s';
            } else {
                speed = '.3s';
            }
        }

        if (effect == 'swing') {
            if (inf == 'low') {
              speed = '1s';
            } else {
              speed = '.3s';
            }
        }
        if (effect == 'squash') {
            if (inf == 'low') {
              speed = '3s';
            } else {
              speed = '1s';
            }
        }

        if (effect == 'floating') {
            if (inf == 'low') {
                speed = '10s';
            } else {
                speed = '.3s';
            }
        }

        if (effect == 'shake' || effect == null) {
            console.log("inside animate speed");
            if (inf == 'low') {
                speed = '10s';
            } else {
                speed = '.8s';
            }
        }
        return speed;
    }

    /*----------
    Remove the username from the chat message
    ----------*/
    function removeName(txt) {
        txt = txt.replace(/^.*?:/, "");
        return txt;
    }

    /*----------
    Clear animations
    ----------*/
    function clearAnimations() {
        $('#bounce').css('display', 'none');
        $('#swing').css('display', 'none');
        $('#squash').css('display', 'none');
        $('#floating').css('display', 'none');
        $('#shake').css('display', 'none');
    }

    /*----------
    Apply all preview animations to effect library
    ----------*/
    function animatePreview(message) {
        shakePreview(message);
        bouncePreview(message);
        swingPreview(message);
        squashPreview(message);
        floatingPreview(message);
    }

    /*----------
    Add text animations to box as the user types
    ----------*/
    function liveAnimate() {
        $('#m').keyup(function() {
            // the input being typed by the user
            input = $('#m').val();

            // assign animation to the message influence determined by plotGSRData() in linegraph.js
            animatePreview(removeName(input));
            console.log(effect);
            if (effect == null) {
                animateShake(removeName(input));
            } else if (effect == "swing") {
                animateSwing(removeName(input));
            } else if (effect == "bounce") {
                animateBounce(removeName(input));
            } else if (effect == "floating") {
                animateFloating(removeName(input));
            } else if (effect == "shake") {
                animateShake(removeName(input));
            } else if (effect == "squash") {
                animateSquash(removeName(input));
            }

        });
    }

    /*----------
    Display animation CSS in main div for all effects
    ----------*/

    // bounces up and down
    function animateBounce(message) {
        clearAnimations();
        $('#bounce').css('display', 'block');

        if (inf == "low") {
            document.getElementById("bounce").style.animationDuration = "2s";
        } else {
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
        } else {
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
        } else {
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
        } else {
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
        } else {
            document.getElementById("floating").style.animationDuration = ".3s";
        }

        document.getElementById('floating').innerHTML = message;
    }

    /*----------
    Display animation CSS in effect library for all effects
    ----------*/

    // bounces up and down
    function bouncePreview(message) {
        $('#bounce-preview').css('display', 'block');

        if (inf == "low") {
            document.getElementById("bounce-preview").style.animationDuration = "2s";
        } else {
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
        } else {
            document.getElementById("swing-preview").style.animationDuration = ".3s";
        }

        document.getElementById('swing-preview').innerHTML = message;
    }

    // shakes back and forth quickly
    function shakePreview(message) {
        $('#shake-preview').css('display', 'block');

        if (inf == "low") {
            document.getElementById("shake-preview").style.animationDuration = "10s";
        } else {
            document.getElementById("shake-preview").style.animationDuration = ".8s";
        }

        document.getElementById('shake-preview').innerHTML = message;
    }

    // squashes text
    function squashPreview(message) {
        $('#squash-preview').css('display', 'block');

        if (inf == "low") {
            document.getElementById("squash-preview").style.animationDuration = "3s";
        } else {
            document.getElementById("squash-preview").style.animationDuration = "1s";
        }

        document.getElementById('squash-preview').innerHTML = message;
    }

    // large and slow tilt
    function floatingPreview(message) {
        $('#floating-preview').css('display', 'block');

        if (inf == "low") {
            document.getElementById("floating-preview").style.animationDuration = "10s";
        } else {
            document.getElementById("floating-preview").style.animationDuration = ".3s";
        }

        document.getElementById('floating-preview').innerHTML = message;
    }

});
