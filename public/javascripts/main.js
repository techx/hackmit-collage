function statusChangeCallback(response) {
  console.log(response);
  if (response.status === 'connected') {
    getInfo();
  } else if (response.status === 'not_authorized') {
    //$("#info").append(" please log into this app")
  } else {
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
  appId      : '942948199091459',
  cookie     : true,  // enable cookies to allow the server to access the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.2' // use version 2.2
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
  $("#status").html("Loading...");
  $("#fb").hide();

  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    //Send data to db
    data = {
      "name" : response.name,
      "id" : response.id
    };
    $.post("/addNew", data, function(res){
      $('#info').html('Thank you, ' + response.name + '! Your response has been recorded') ;
      var url = "https://graph.facebook.com/"+ response.id +"/picture?type=large";
      $('#profile-pic').attr("src", url);
    });
  });
}
