function statusChangeCallback(response) {
  // console.log(response);

  if (response.status === 'connected') {
    getInfo();
  } else if (response.status === 'not_authorized') {
    $("#loading").addClass('hidden');
    $("#fb").css("display", "inline-block");
    $("#info").show();
    // console.log("not autorized");
    //$("#info").append(" please log into this app")
  } else {

    $("#loading").addClass('hidden');
    $("#fb").css("display", "inline-block");
    //$("#info").append(" please log into Facebook")

  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '1790981854461766',
  cookie     : true,  // enable cookies to allow the server to access the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.4' // use version 2.2
});


FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Get userInfo from graphAPI and send to backend server.
function getInfo() {

  $("#loading").show();

  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    //Send data to db
    data = {
      "name" : response.name,
      "id" : response.id
    };
    $.post("/addNew", data, function(res){
      $('#fb-btn').hide();

      $('#info').html("<p> Thank you, " + response.name + "! </p> <p> We've got your submission 😎 </p>");

      var url = "https://graph.facebook.com/"+ response.id +"/picture?type=large";
      $("#loading").addClass('hidden');
      $('#profile-pic').attr("src", url).removeClass('hidden');
    });
  });
}
