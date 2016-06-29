// Variables ========================
var fs = require("fs");

var keys = require("/keys.js");

var request = require("request");

var twitter = require("twitter");

var spotify = require("spotify");

var userInput = process.argv[2];

// Functions/Arguments =========================

var twitLogin = new twitter ({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

if (userInput == "my-tweets") {
  var params = { screen_name: "tgreen304" };
  twitLogin.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      } else {
        console.log("error: 400");
      }
  });
}

//spotify-this-song

//movie-this

//do-what-it-says
